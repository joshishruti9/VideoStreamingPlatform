class AuthStrategy {
    constructor() {
        if (this.constructor === AuthStrategy) {
            throw new Error("AuthStrategy is an abstract class and cannot be instantiated directly.");
        }
    }

    // Method to configure the authentication strategy
    configureStrategy() {
        throw new Error("Method 'configureStrategy()' must be implemented.");
    }
}

module.exports = AuthStrategy;