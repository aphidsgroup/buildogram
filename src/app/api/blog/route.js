import { NextResponse } from 'next/server';
import sql from '@/lib/db';
import { getUserFromRequest } from '@/lib/auth';

export async function GET() {
  const posts = await sql`SELECT bp.*,u.name as author_name FROM blog_posts bp LEFT JOIN users u ON u.id=bp.author_id WHERE bp.is_published=true ORDER BY bp.published_at DESC`;
  return NextResponse.json({ posts });
}

export async function POST(req) {
  const u = getUserFromRequest(req);
  if (!u || !['ops_admin', 'ops_pm'].includes(u.role)) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  const b = await req.json();
  const slug = b.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  const [post] = await sql`INSERT INTO blog_posts(title,slug,excerpt,content,cover_image_url,author_id,tags,is_published,published_at)
    VALUES(${b.title},${slug},${b.excerpt || null},${b.content},${b.cover_image_url || null},${u.id},${b.tags || []},${b.is_published || false},${b.is_published ? new Date().toISOString() : null}) RETURNING *`;
  return NextResponse.json({ post });
}
