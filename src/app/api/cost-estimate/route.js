import { NextResponse } from 'next/server';
import sql from '@/lib/db';
import { checkRateLimit } from '@/lib/security/rateLimit';

export async function POST(req) {
  const rateLimit = checkRateLimit(req, { namespace: 'cost-estimate', limit: 30, windowMs: 60 * 60 * 1000 });
  if (!rateLimit.allowed) return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
  try {
    const { city = 'Chennai', spec_level = 'standard', plot_area_sqft, floors } = await req.json();
    const plotArea = Number(plot_area_sqft);
    if (!Number.isFinite(plotArea) || plotArea < 100 || plotArea > 100000) {
      return NextResponse.json({ error: 'Invalid plot area' }, { status: 400 });
    }
    const [config] = await sql`SELECT * FROM cost_config WHERE city=${city} AND spec_level=${spec_level}`;
    if (!config) return NextResponse.json({ error: 'Config not found' }, { status: 404 });
    const floorFactor = floors === 'G' ? 1 : floors === 'G+1' ? 1.85 : 2.65;
    const area = plotArea * floorFactor;
    const min = Math.round(area * config.rate_per_sqft_min);
    const max = Math.round(area * config.rate_per_sqft_max);
    return NextResponse.json({
      min, max,
      per_sqft_min: config.rate_per_sqft_min,
      per_sqft_max: config.rate_per_sqft_max,
      breakdown: {
        structure: { min: Math.round(min * config.structure_pct / 100), max: Math.round(max * config.structure_pct / 100), pct: config.structure_pct },
        finishes:  { min: Math.round(min * config.finishes_pct / 100),  max: Math.round(max * config.finishes_pct / 100),  pct: config.finishes_pct  },
        others:    { min: Math.round(min * config.others_pct / 100),    max: Math.round(max * config.others_pct / 100),    pct: config.others_pct    }
      }
    });
  } catch { return NextResponse.json({ error: 'Unable to calculate estimate' }, { status: 500 }); }
}
