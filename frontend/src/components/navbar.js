import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Navbar = () => {
    const [user, setUser] = useState(null);

    // Fetch logged-in user
    useEffect(() => {
        axios.get("http://localhost:5000/auth/user", { withCredentials: true })
            .then((response) => {
                // Set user data
                if (response.data.user) {
                    setUser(response.data.user); 
                }
            })
            .catch((error) => console.error("Error fetching user:", error));
    }, []);

    return (
        <nav style={styles.navbar}>
            {/* Left-Aligned Navigation Links */}
            <div style={styles.leftSection}>
                <h2 style={styles.logo}>YouTube Clone</h2>
                <ul style={styles.navLinks}>
                    <li><Link to="/" style={styles.link}>Home</Link></li>
                    <li><Link to="/upload" style={styles.link}>Upload</Link></li>
                </ul>
            </div>

            {/* Right Section: Show "Welcome, Name" or Login Button */}
            <div style={styles.rightSection}>
                {user ? (
                    <>
                        <span style={styles.welcome}>Welcome, {user.name}!</span>
                        <a href="http://localhost:5000/auth/logout" style={styles.logoutButton}>
                            Logout
                        </a>
                    </>
                ) : (
                    <a href="http://localhost:5000/auth/google" style={styles.loginButton}>
                        Login with Google
                    </a>
                )}
            </div>
        </nav>
    );
};

const styles = {
    navbar: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#f8d7da",
        padding: "10px 20px",
        color: "#333",
        boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
    },
    leftSection: {
        display: "flex",
        alignItems: "center",
        gap: "20px",
    },
    logo: {
        margin: 0,
        color: "#222",
        fontWeight: "bold",
    },
    navLinks: {
        listStyle: "none",
        display: "flex",
        gap: "15px",
        padding: 0,
        margin: 0,
    },
    link: {
        color: "#333",
        textDecoration: "none",
        fontSize: "18px",
        fontWeight: "bold",
    },
    rightSection: {
        display: "flex",
        alignItems: "center",
        gap: "10px",
    },
    welcome: {
        fontSize: "16px",
        fontWeight: "bold",
        marginRight: "10px",
    },
    loginButton: {
        backgroundColor: "#fff",
        color: "#007BFF",
        padding: "8px 16px",
        borderRadius: "5px",
        textDecoration: "none",
        fontWeight: "bold",
        border: "1px solid #007BFF",
    },
    logoutButton: {
        backgroundColor: "#ff4d4d",
        color: "#fff",
        padding: "8px 16px",
        borderRadius: "5px",
        textDecoration: "none",
        fontWeight: "bold",
        border: "none",
    }
};

export default Navbar;
