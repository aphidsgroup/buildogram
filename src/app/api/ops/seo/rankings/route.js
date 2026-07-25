import { NextResponse } from 'next/server';

export async function GET() {
  const fetchTimestamp = new Date().toISOString();
  try {
    const apiKey = process.env.SERPER_API_KEY;
    if (!apiKey) {
      throw new Error('SERPER_API_KEY environment variable is missing');
    }

    const keywords = [
      'End-to-End Construction chennai',
      'structural audit chennai',
      'soil testing chennai',
      'house construction cost chennai',
      'home construction company in chennai'
    ];

    const results = [];
    const meta = {
      lastFetchTimestamp: fetchTimestamp,
      apiState: 'success',
      cachedState: 'live',
      country: 'India',
      location: 'Chennai, Tamil Nadu, India',
      language: 'en',
      device: 'desktop'
    };

    for (const keyword of keywords) {
      const response = await fetch('https://google.serper.dev/search', {
        method: 'POST',
        headers: {
          'X-API-KEY': apiKey,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          q: keyword,
          location: 'Chennai, Tamil Nadu, India',
          gl: 'in', 
          hl: 'en'
        })
      });

      if (!response.ok) {
        console.error(`Failed to fetch ranking for ${keyword}`);
        results.push({
          keyword,
          position: null,
          url: null,
          title: null,
          type: null,
          timestamp: fetchTimestamp,
          apiState: 'failure',
          previousSnapshot: null
        });
        continue;
      }

      const data = await response.json();
      const organic = data.organic || [];

      const ourResultIndex = organic.findIndex(r => r.link && r.link.includes('buildogram.in'));
      
      if (ourResultIndex !== -1) {
        results.push({
          keyword,
          position: ourResultIndex + 1,
          url: organic[ourResultIndex].link,
          title: organic[ourResultIndex].title,
          type: 'organic',
          timestamp: fetchTimestamp,
          apiState: 'success',
          previousSnapshot: null // We don't have a DB yet to fetch previous snapshots
        });
      } else {
        results.push({
          keyword,
          position: null,
          url: null,
          title: null,
          type: 'none',
          timestamp: fetchTimestamp,
          apiState: 'success',
          previousSnapshot: null
        });
      }
    }

    return NextResponse.json({
      success: true,
      meta,
      data: results
    });

  } catch (error) {
    console.error('Serper API Error:', error);
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
