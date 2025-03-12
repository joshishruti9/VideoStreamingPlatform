// models/videoModel.js
const mysql = require('mysql2');

// MySQL database connection
const db = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "ApplePie", // Change this to your MySQL password
    database: "youtube_app"
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database: ', err);
        return;
    }
    console.log('Connected to MySQL!');
});

module.exports = db; 