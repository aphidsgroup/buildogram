import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
import sql from './src/lib/db.js';

async function run() {
  try {
    const rawFollowUps = await sql`
        SELECT 
          a.id as activity_id, 
          a.title, 
          a.description, 
          a.follow_up_at,
          l.id as lead_id, 
          l.name as lead_name, 
          l.phone as lead_phone, 
          l.lead_type, 
          l.status as lead_status
        FROM lead_activities a
        JOIN leads l ON a.lead_id = l.id
        WHERE l.status = ANY(ARRAY['new', 'contacted', 'qualified', 'proposal', 'inspection_scheduled', 'work_started', 'approved', 'quoted'])
          AND a.activity_type = 'follow_up' -- wait, previously it was a.type='follow_up'. let's use what the API has
          AND a.follow_up_at >= date_trunc('day', NOW())
          AND a.follow_up_at < date_trunc('day', NOW() + INTERVAL '7 days')
        ORDER BY a.follow_up_at ASC
      `;
    console.log("Follow ups fetched successfully:", rawFollowUps.length);
    
    // simulate what the API does
    const now = new Date();
    const todayStr = now.toISOString().split('T')[0];
    
    rawFollowUps.forEach(f => {
      const fDate = new Date(f.follow_up_at);
      const fDateStr = fDate.toISOString().split('T')[0];
    });
    console.log("Date parsing successful");
  } catch(e) {
    console.error("FAILED!", e);
  }

  process.exit(0);
}

run();
