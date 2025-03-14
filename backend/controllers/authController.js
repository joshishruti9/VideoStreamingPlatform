const passport = require("../config/passport");

class AuthController {
    // Google OAuth Login
    googleAuth = passport.authenticate("google", { scope: ["profile", "email"] });

    // Google OAuth Callback
    googleAuthCallback = passport.authenticate("google", { failureRedirect: "/" });

    // Handle Google OAuth Callback
    handleGoogleCallback = (req, res) => {
        res.redirect("http://localhost:3000/"); // Redirect user to homepage
    };

    // Logout User
    logoutUser = (req, res) => {
        req.logout((err) => {
            if (err) {
                return res.status(500).json({ error: "Error logging out" });
            }
            req.session.destroy(() => {
                res.redirect("http://localhost:3000/"); // Redirect to homepage after logout
            });
        });
    };

    // Get User Session
    getUserSession = (req, res) => {
        if (req.isAuthenticated()) {
            res.json({ user: req.user });
        } else {
            res.status(401).json({ message: "Unauthorized" });
        }
    };
}

module.exports = new AuthController();