import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL || 'postgres://placeholder:placeholder@localhost/placeholder');

export default sql;
