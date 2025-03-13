import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Dashboard from "./pages/dashboard";
import Upload from "./pages/UploadPage";
import Watch from "./pages/WatchVideo"

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/upload" element={<Upload />} />
                <Route path="/watch/:id" element={<Watch />} />
            </Routes>
        </Router>
    );
};

export default App;
