const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');
const config = require('./config.json');

async function initializeDatabase() {
    try {
        // Create connection to the existing database
        const connection = await mysql.createConnection({
            host: config.database.host,
            port: config.database.port,
            user: config.database.user,
            password: config.database.password,
            database: config.database.database
        });

        console.log('Connected to MySQL server');

        // Create users table
        await connection.query(`
            CREATE TABLE IF NOT EXISTS users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                username VARCHAR(50) NOT NULL UNIQUE,
                password VARCHAR(255) NOT NULL,
                email VARCHAR(100) NOT NULL UNIQUE,
                role ENUM('admin', 'user') NOT NULL DEFAULT 'user',
                is_active BOOLEAN NOT NULL DEFAULT FALSE,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            )
        `);
        console.log('Users table created successfully');

        // Create default admin account
        const adminUsername = 'admin';
        const adminPassword = 'admin123';
        const adminEmail = 'admin@example.com';
        const adminPasswordHash = adminPassword;

        // Check if admin account already exists
        const [existingAdmins] = await connection.query('SELECT * FROM users WHERE email = ?', [adminEmail]);
        
        if (existingAdmins.length === 0) {
            await connection.query(
                'INSERT INTO users (username, email, password, role, is_active, created_at, updated_at) VALUES (?, ?, ?, ?, ?, NOW(), NOW())',
                [adminUsername, adminEmail, adminPasswordHash, 'admin', true]
            );
            console.log('Default admin account created successfully');
            console.log('Admin credentials:');
            console.log('Username:', adminUsername);
            console.log('Password:', adminPassword);
            console.log('Email:', adminEmail);
        } else {
            console.log('Default admin account already exists');
        }

        await connection.end();
        console.log('Database initialization completed');
    } catch (error) {
        console.error('Error initializing database:', error);
        process.exit(1);
    }
}

initializeDatabase(); 