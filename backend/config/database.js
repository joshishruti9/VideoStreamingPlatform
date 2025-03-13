const mysql = require('mysql2');

class Database {
    constructor() {
        if (!Database.instance) {
            this.connection = mysql.createConnection({
                host: "127.0.0.1",
                user: "root",
                password: "root", // Change this to your MySQL password
                database: "youtube_app"
            });

            this.connection.connect((err) => {
                if (err) {
                    console.error('Error connecting to the database: ', err);
                    return;
                }
                console.log('Connected to MySQL!');
            });

            Database.instance = this;
        }
        return Database.instance;
    }

    getConnection() {
        return this.connection;
    }
}

// Export the singleton instance
const dbInstance = new Database();
module.exports = dbInstance.getConnection();