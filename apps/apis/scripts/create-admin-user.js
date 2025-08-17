const bcrypt = require('bcryptjs');
const { pool } = require('../config/database');

async function createAdminUser() {
  try {
    console.log('🔐 Creating default admin user...');
    
    // Check if admin user already exists
    const [existingUsers] = await pool.execute(
      'SELECT id FROM users WHERE username = ?',
      ['admin']
    );

    if (existingUsers.length > 0) {
      console.log('✅ Admin user already exists');
      return;
    }

    // Create admin user
    const hashedPassword = await bcrypt.hash('admin123', 10);
    
    await pool.execute(
      'INSERT INTO users (username, password, role, created_at) VALUES (?, ?, ?, NOW())',
      ['admin', hashedPassword, 'superadmin']
    );

    console.log('✅ Admin user created successfully!');
    console.log('📝 Username: admin');
    console.log('🔑 Password: admin123');
    console.log('⚠️  Please change the password after first login!');
    
  } catch (error) {
    console.error('❌ Error creating admin user:', error);
  } finally {
    process.exit(0);
  }
}

// Run the script
createAdminUser();
