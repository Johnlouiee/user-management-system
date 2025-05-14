const mysql = require('mysql2/promise');
const config = require('./config.json');

async function updateDatabase() {
    try {
        // Create connection
        const connection = await mysql.createConnection({
            host: config.database.host,
            port: config.database.port,
            user: config.database.user,
            password: config.database.password,
            database: config.database.database
        });

        console.log('Connected to MySQL server');

        // Add is_active column
        await connection.query(`
            ALTER TABLE users 
            ADD COLUMN IF NOT EXISTS is_active BOOLEAN NOT NULL DEFAULT FALSE
        `);
        console.log('Added is_active column to users table');

        // Update admin user
        const [result] = await connection.query(`
            UPDATE users 
            SET is_active = TRUE 
            WHERE email = 'admin@example.com'
        `);
        console.log('Updated admin user:', result);

        // Verify admin user
        const [admin] = await connection.query(`
            SELECT id, username, email, role, is_active 
            FROM users 
            WHERE email = 'admin@example.com'
        `);
        console.log('Admin user details:', admin[0]);

        await connection.end();
        console.log('Database update completed');
    } catch (error) {
        console.error('Error updating database:', error);
        process.exit(1);
    }
}

updateDatabase(); 