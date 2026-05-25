import { NextResponse } from 'next/server';
import sql from '@/lib/db';
import { requireAdmin, fail } from '@/lib/apiAuth';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

export async function GET(request) {
  const { user, error } = requireAdmin(request);
  if (error) return error;

  const { searchParams } = new URL(request.url);
  const fileNum = searchParams.get('file');
  if (!fileNum) return fail('Provide ?file=016 parameter');

  const fileName = `${fileNum}_${getMigrationName(fileNum)}.sql`;
  const filePath = path.join(process.cwd(), 'migrations', fileName);

  if (!fs.existsSync(filePath)) {
    // Try any file starting with the number
    const dir = fs.readdirSync(path.join(process.cwd(), 'migrations'));
    const match = dir.find(f => f.startsWith(fileNum) && f.endsWith('.sql'));
    if (!match) return fail(`Migration file ${fileNum} not found. Available: ${dir.filter(f=>f.endsWith('.sql')).join(', ')}`);
    const content = fs.readFileSync(path.join(process.cwd(), 'migrations', match), 'utf8');
    return runSQL(content, match);
  }

  const content = fs.readFileSync(filePath, 'utf8');
  return runSQL(content, fileName);
}

async function runSQL(content, fileName) {
  try {
    // Split on semicolons, filter empty
    const statements = content
      .split(/;\s*\n/)
      .map(s => s.trim())
      .filter(s => s.length > 0 && !s.startsWith('--'));

    let executed = 0;
    const errors = [];
    for (const stmt of statements) {
      try {
        await sql.unsafe(stmt);
        executed++;
      } catch (e) {
        errors.push({ stmt: stmt.slice(0, 80) + '...', error: e.message });
      }
    }
    return NextResponse.json({
      success: errors.length === 0,
      file: fileName,
      executed,
      errors,
      message: errors.length === 0
        ? `Migration ${fileName} applied — ${executed} statements executed.`
        : `Migration partial: ${executed} ok, ${errors.length} errors.`
    });
  } catch (e) {
    return NextResponse.json({ success: false, message: e.message }, { status: 500 });
  }
}

function getMigrationName(num) {
  const map = {
    '016': 'partner_ecosystem',
    '017': 'partner_users_link',
  };
  return map[num] || num;
}
