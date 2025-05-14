const mysql = require('mysql2/promise');
const config = require('../config.json');

const pool = mysql.createPool({
    host: config.database.host,
    port: config.database.port,
    user: config.database.user,
    password: config.database.password,
    database: config.database.database,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Test the connection
pool.getConnection()
    .then(connection => {
        console.log('Database connection successful');
        connection.release();
    })
    .catch(err => {
        console.error('Database connection failed:', err);
        process.exit(1);
    });

module.exports = pool; 