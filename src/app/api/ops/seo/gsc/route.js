import { NextResponse } from 'next/server';
import { google } from 'googleapis';

export async function GET() {
  try {
    // 1. Authenticate with Google
    let auth;
    if (process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON) {
      // Use raw JSON from env (Vercel)
      const credentials = JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON);
      auth = new google.auth.GoogleAuth({
        credentials,
        scopes: ['https://www.googleapis.com/auth/webmasters.readonly'],
      });
    } else {
      // Use file path from GOOGLE_APPLICATION_CREDENTIALS (Local)
      auth = new google.auth.GoogleAuth({
        scopes: ['https://www.googleapis.com/auth/webmasters.readonly'],
      });
    }

    const searchconsole = google.searchconsole({
      version: 'v1',
      auth: auth,
    });

    const siteUrl = process.env.GSC_SITE_URL;
    if (!siteUrl) {
      throw new Error('GSC_SITE_URL environment variable is missing');
    }

    // Get dates for the last 30 days
    const endDate = new Date();
    endDate.setDate(endDate.getDate() - 3); // GSC data is usually delayed by 2-3 days
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - 30);

    const formatDate = (date) => date.toISOString().split('T')[0];

    // Query 1: Data grouped by Date (for the chart)
    const dateQueryRes = await searchconsole.searchanalytics.query({
      siteUrl: siteUrl,
      requestBody: {
        startDate: formatDate(startDate),
        endDate: formatDate(endDate),
        dimensions: ['date'],
        rowLimit: 30,
      },
    });

    // Query 2: Data grouped by Query (for top keywords table)
    const queryRes = await searchconsole.searchanalytics.query({
      siteUrl: siteUrl,
      requestBody: {
        startDate: formatDate(startDate),
        endDate: formatDate(endDate),
        dimensions: ['query'],
        rowLimit: 20,
      },
    });

    // Format the response
    const dailyData = (dateQueryRes.data.rows || []).map(row => ({
      date: row.keys[0],
      clicks: row.clicks,
      impressions: row.impressions,
      ctr: row.ctr,
      position: row.position
    }));

    // Sort chronologically
    dailyData.sort((a, b) => new Date(a.date) - new Date(b.date));

    const topQueries = (queryRes.data.rows || []).map(row => ({
      query: row.keys[0],
      clicks: row.clicks,
      impressions: row.impressions,
      ctr: row.ctr,
      position: row.position
    }));

    // Calculate totals
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
      error: error.message 
    }, { status: 500 });
  }
}
