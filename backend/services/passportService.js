const userModel = require("../models/userModel");

class PassportService {
    constructor(passport) {
        this.passport = passport; // Store the passport instance
        this.strategies = []; // Store multiple strategies
    }

    // Add a strategy to the list
    useStrategy(strategy) {
        this.strategies.push(strategy);
    }

    // Initialize all strategies
    initialize() {
        this.strategies.forEach((strategy) => {
            strategy.configureStrategy(); // Configure each strategy
        });

        // Shared serialization/deserialization logic
        this.passport.serializeUser((user, done) => {
            done(null, user.id); // Use a common identifier (e.g., user.id)
        });

        this.passport.deserializeUser((id, done) => {
            // Fetch user by ID (you can use a generic user model method)
            userModel.findUserById(id, (err, user) => {
                done(err, user);
            });
        });
    }
}

module.exports = PassportService;