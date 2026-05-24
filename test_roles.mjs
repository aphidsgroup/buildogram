import sql from './src/lib/db.js';
sql`SELECT email, role FROM users`.then(res => {
  console.log(res);
  process.exit(0);
}).catch(err => {
  console.error(err);
  process.exit(1);
});
