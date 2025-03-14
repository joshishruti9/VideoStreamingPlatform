const userModel = require("../models/userModel");

class UserController {
    // Find user by provider ID
    findUserByProviderId(provider, providerId, callback) {
        userModel.findUserByProviderId(provider, providerId, callback);
    }

    // Find user by ID (for deserialization)
    findUserByID(id, callback) {
        userModel.findUserById(id, callback);
    }

    // Create a new user
    createUser(provider, profile, callback) {
        userModel.createUser(provider, profile, callback);
    }
}

module.exports = new UserController();