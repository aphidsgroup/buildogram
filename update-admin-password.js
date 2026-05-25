const { neon } = require('@neondatabase/serverless');
const bcrypt = require('bcryptjs');
require('dotenv').config({ path: '.env.local' });

async function updatePassword() {
  const sql = neon(process.env.DATABASE_URL);
  
  // Strong private password
  const newPassword = 'BuildogramAdmin$Secure2026!';
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  
  const adminEmail = 'admin@buildogram.in';
  
  try {
    const res = await sql`
      UPDATE users 
      SET password_hash = ${hashedPassword} 
      WHERE email = ${adminEmail} 
      RETURNING id, email
    `;
    
    if (res.length > 0) {
      console.log('Admin password updated successfully.');
      console.log('New Password:', newPassword);
    } else {
      console.log('Admin user not found. Run seed script first.');
    }
  } catch (error) {
    console.error('Error updating password:', error);
  }
}

updatePassword();
