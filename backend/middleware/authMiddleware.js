const isAuthenticated = (req, res, next) => {
    console.log(req.user)
    console.log("Session ID:", req.sessionID); // Debugging
    console.log("User:", req.user); // Debugging
    if (req.isAuthenticated()) {
        return next(); // User is authenticated, proceed to the next middleware/route
    }
    // User is not authenticated
    res.status(401).json({ message: "Unauthorized: Please log in" });
};

module.exports = isAuthenticated;