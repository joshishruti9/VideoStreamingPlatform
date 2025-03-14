// models/userModel.js
const db = require("../config/database");

class UserModel {

    // Find user by provider ID (generic)
    findUserByProviderId = (provider, providerId, callback) => {
        const query = "SELECT * FROM users WHERE provider = ? AND provider_id = ?";
        db.query(query, [provider, providerId], (err, results) => {
            if (err) return callback(err, null);
            return callback(null, results.length > 0 ? results[0] : null);
        });
    };

    // Find user by ID (for deserialization)
    findUserById = (id, callback) => {
        db.query("SELECT * FROM users WHERE id = ?", [id], (err, results) => {
            if (err) return callback(err, null);
            return callback(null, results.length > 0 ? results[0] : null);
        });
    };

    // Create new user in DB (generic)
    createUser = (provider, profile, callback) => {
        const { id, displayName, emails, photos } = profile;
        const email = emails?.[0]?.value || null;
        const photo = photos?.[0]?.value || null;

        const sql = `INSERT INTO users (provider, provider_id, name, email, profile_pic) VALUES (?, ?, ?, ?, ?)`;
        const values = [provider, id, displayName, email, photo];

        db.query(sql, values, (err, result) => {
            if (err) return callback(err, null);
            callback(null, { id: result.insertId, name: displayName, email, profile_pic: photo });
        });
    };

}

module.exports = new UserModel();