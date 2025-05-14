const mysql = require('mysql2/promise');
const config = require('./config.json');

async function verifyAdmin() {
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

        // Get admin user details
        const [admin] = await connection.query(`
            SELECT id, username, email, role, is_active, password 
            FROM users 
            WHERE email = 'admin@example.com'
        `);

        if (admin.length === 0) {
            console.log('Admin user not found!');
        } else {
            console.log('Admin user details:', {
                id: admin[0].id,
                username: admin[0].username,
                email: admin[0].email,
                role: admin[0].role,
                is_active: admin[0].is_active,
                password_hash: admin[0].password
            });
        }

        await connection.end();
    } catch (error) {
        console.error('Error verifying admin:', error);
        process.exit(1);
    }
}

verifyAdmin(); 