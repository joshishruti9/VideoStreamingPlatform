const passport = require("passport");
const PassportService = require("../services/passportService");
const GoogleAuthStrategy = require("../strategies/GoogleStrategy");

// Create a new instance of PassportService and pass the passport instance
const passportService = new PassportService(passport);

// Add Google strategy and pass the passport instance
const googleStrategy = new GoogleAuthStrategy(passport);
passportService.useStrategy(googleStrategy);

// Initialize Passport
passportService.initialize();

module.exports = passport; // Export the configured passport instance