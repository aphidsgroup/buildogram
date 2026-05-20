import { NextResponse } from 'next/server';
import sql from '@/lib/db';

export async function POST(req) {
  try {
    const { city = 'Chennai', spec_level = 'standard', plot_area_sqft, floors } = await req.json();
    const [config] = await sql`SELECT * FROM cost_config WHERE city=${city} AND spec_level=${spec_level}`;
    if (!config) return NextResponse.json({ error: 'Config not found' }, { status: 404 });
    const floorFactor = floors === 'G' ? 1 : floors === 'G+1' ? 1.85 : 2.65;
    const area = parseFloat(plot_area_sqft) * floorFactor;
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
  } catch (e) { return NextResponse.json({ error: e.message }, { status: 500 }); }
}
