const db = require("../config/database"); // Import database connection

// Find user by Google ID
const findUserByGoogleId = (googleId, callback) => {
    db.query("SELECT * FROM users WHERE google_id = ?", [googleId], (err, results) => {
        if (err) return callback(err, null);
        return callback(null, results.length > 0 ? results[0] : null);
    });
};

// Create new user in DB
const createUser = (profile, callback) => {
    const { id, displayName, emails, photos } = profile;
    const email = emails?.[0]?.value || null;
    const photo = photos?.[0]?.value || null;

    const sql = `INSERT INTO users (google_id, name, email, profile_pic) VALUES (?, ?, ?, ?)`;
    const values = [id, displayName, email, photo];

    db.query(sql, values, (err, result) => {
        if (err) return callback(err, null);
        callback(null, { id: result.insertId, google_id: id, name: displayName, email, profile_pic: photo });
    });
};

// Export functions
module.exports = { findUserByGoogleId, createUser };
