const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');

async function initializeDatabase() {
    try {
        // Create connection without database
        const connection = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '' // default XAMPP password is empty
        });

        console.log('Connected to MySQL server');

        // Read and execute the schema file
        const schema = fs.readFileSync(path.join(__dirname, 'database', 'schema.sql'), 'utf8');
        const statements = schema.split(';').filter(statement => statement.trim());

        for (const statement of statements) {
            if (statement.trim()) {
                await connection.query(statement);
                console.log('Executed:', statement.substring(0, 50) + '...');
            }
        }

        console.log('Database initialized successfully');
        await connection.end();
    } catch (error) {
        console.error('Error initializing database:', error);
        process.exit(1);
    }
}

initializeDatabase(); 