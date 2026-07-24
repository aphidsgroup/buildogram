import { NextResponse } from 'next/server';
import { google } from 'googleapis';

export async function GET() {
  const fetchTimestamp = new Date().toISOString();
  
  try {
    let auth;
    if (process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON) {
      const credentials = JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON);
      auth = new google.auth.GoogleAuth({
        credentials,
        scopes: ['https://www.googleapis.com/auth/webmasters.readonly'],
      });
    } else {
      auth = new google.auth.GoogleAuth({
        scopes: ['https://www.googleapis.com/auth/webmasters.readonly'],
      });
    }

    const searchconsole = google.searchconsole({
      version: 'v1',
      auth: auth,
    });

    const siteUrl = process.env.GSC_SITE_URL || 'https://buildogram.in';

    const endDate = new Date();
    endDate.setDate(endDate.getDate() - 3); 
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - 30);

    const formatDate = (date) => date.toISOString().split('T')[0];

    const dateQueryRes = await searchconsole.searchanalytics.query({
      siteUrl: siteUrl,
      requestBody: {
        startDate: formatDate(startDate),
        endDate: formatDate(endDate),
        dimensions: ['date'],
        rowLimit: 30,
      },
    });

    const queryRes = await searchconsole.searchanalytics.query({
      siteUrl: siteUrl,
      requestBody: {
        startDate: formatDate(startDate),
        endDate: formatDate(endDate),
        dimensions: ['query'],
        rowLimit: 20,
      },
    });

    const dailyData = (dateQueryRes.data.rows || []).map(row => ({
      date: row.keys[0],
      clicks: row.clicks,
      impressions: row.impressions,
      ctr: row.ctr,
      position: row.position
    }));

    dailyData.sort((a, b) => new Date(a.date) - new Date(b.date));

    const topQueries = (queryRes.data.rows || []).map(row => ({
      query: row.keys[0],
      clicks: row.clicks,
      impressions: row.impressions,
      ctr: row.ctr,
      position: row.position
    }));

    const totals = dailyData.reduce((acc, curr) => {
      acc.clicks += curr.clicks;
      acc.impressions += curr.impressions;
      return acc;
    }, { clicks: 0, impressions: 0 });

    const averageCtr = totals.impressions > 0 ? (totals.clicks / totals.impressions) : 0;
    
    let averagePosition = 0;
    if (dailyData.length > 0) {
      averagePosition = dailyData.reduce((acc, curr) => acc + curr.position, 0) / dailyData.length;
    }

    return NextResponse.json({
      success: true,
      meta: {
        lastFetchTimestamp: fetchTimestamp,
        newestDataDate: formatDate(endDate),
        isPreliminary: false,
        propertyQueried: siteUrl,
        dateRange: `${formatDate(startDate)} to ${formatDate(endDate)}`,
        filters: { country: 'all', device: 'all' },
        apiState: 'success',
        cachedState: 'live'
      },
      data: {
        daily: dailyData,
        queries: topQueries,
        summary: {
          totalClicks: totals.clicks,
          totalImpressions: totals.impressions,
          averageCtr,
          averagePosition
        }
      }
    });

  } catch (error) {
    console.error('GSC API Error:', error);
    return NextResponse.json({ 
      success: false, 
      meta: {
        lastFetchTimestamp: fetchTimestamp,
        apiState: 'failure',
        error: error.message
      }
    }, { status: 500 });
  }
}
