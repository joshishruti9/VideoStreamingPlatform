import React from "react";

const Navbar = () => {
    return (
        <nav className="p-4 bg-blue-500 text-white flex justify-between">
            <h1 className="text-xl font-bold">YouTube Clone</h1>
            <a href="http://localhost:5000/auth/google" className="bg-white text-blue-500 px-4 py-2 rounded">
                Login with Google
            </a>
        </nav>
    );
};

export default Navbar;
