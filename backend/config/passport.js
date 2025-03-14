const passport = require("passport");
const PassportService = require("../services/passportService");
const GoogleAuthStrategy = require("../strategies/GoogleStrategy");

class Passport {
    constructor() {
        this.passport = passport;
        this.passportService = new PassportService(passport);
        this.initialize()
    }

    initialize() {
        this.passportService.useStrategy(new GoogleAuthStrategy(this.getPassport()));
        this.passportService.initialize();
    }

    // Method to get the Passport instance
    getPassport() {
        return this.passport;
    }
}

// Export an instance of the Passport class
module.exports = new Passport().getPassport();