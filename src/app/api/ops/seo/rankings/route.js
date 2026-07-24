import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const apiKey = process.env.SERPER_API_KEY;
    if (!apiKey) {
      throw new Error('SERPER_API_KEY environment variable is missing');
    }

    // Hardcoded money keywords we want to track
    const keywords = [
      'turnkey construction chennai',
      'structural audit chennai',
      'soil testing chennai',
      'house construction cost chennai',
      'home construction company in chennai'
    ];

    const results = [];

    // Process keywords sequentially to avoid rate limits/timeouts, 
    // though Serper supports batching, sequential is safer for simple implementation.
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
          gl: 'in' // Google Country: India
        })
      });

      if (!response.ok) {
        console.error(`Failed to fetch ranking for ${keyword}`);
        continue;
      }

      const data = await response.json();
      const organic = data.organic || [];

      // Find buildogram.in in the organic results
      const ourResultIndex = organic.findIndex(r => r.link && r.link.includes('buildogram.in'));
      
      if (ourResultIndex !== -1) {
        results.push({
          keyword,
          position: ourResultIndex + 1, // 1-indexed
          url: organic[ourResultIndex].link,
          title: organic[ourResultIndex].title
        });
      } else {
        results.push({
          keyword,
          position: null, // Not in top 10/100 (depending on API default)
          url: null,
          title: null
        });
      }
    }

    return NextResponse.json({
      success: true,
      data: results
    });

  } catch (error) {
    console.error('Serper API Error:', error);
    return NextResponse.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 });
  }
}
