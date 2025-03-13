import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav style={styles.navbar}>
            {/*Left-Aligned Navigation Links */}
            <div style={styles.leftSection}>
                <h2 style={styles.logo}>YouTube Clone</h2>
                <ul style={styles.navLinks}>
                    <li><Link to="/" style={styles.link}>Home</Link></li>
                    <li><Link to="/upload" style={styles.link}>Upload</Link></li>
                </ul>
            </div>

            {/* Right-Aligned Google Login Button */}
            <a href="http://localhost:5000/auth/google" style={styles.loginButton}>
                Login with Google
            </a>
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
        gap: "20px", // Space between logo and links
    },
    logo: {
        margin: 0,
        color: "#222",
        fontweight: "bold",
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
    loginButton: {
        backgroundColor: "#fff",
        color: "#007BFF",
        padding: "8px 16px",
        borderRadius: "5px",
        textDecoration: "none",
        fontWeight: "bold",
        border: "1px solid #007BFF",
    }
};

export default Navbar;
