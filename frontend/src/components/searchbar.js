import React, { useState } from "react";
import { Search } from "lucide-react";

const SearchBar = ({ onSearch }) => {
    const [query, setQuery] = useState("");

    const handleSearch = (e) => {
        setQuery(e.target.value);
        if (onSearch) {
            onSearch(e.target.value);
        }
    };

    return (
        <div style={styles.searchContainer}>
            <div style={styles.searchBox}>
                <input
                    type="text"
                    placeholder="Search videos..."
                    value={query}
                    onChange={handleSearch}
                    style={styles.input}
                />
                <button style={styles.button}>
                    <Search size={20} />
                </button>
            </div>
        </div>
    );
};

//  CSS Styling
const styles = {
    searchContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        margin: "20px 0",
    },
    searchBox: {
        display: "flex",
        alignItems: "center",
        backgroundColor: "white",
        padding: "10px",
        borderRadius: "20px",
        boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
        width: "100%",
        maxWidth: "600px",
    },
    input: {
        flex: 1,
        border: "none",
        outline: "none",
        padding: "10px",
        fontSize: "16px",
    },
    button: {
        backgroundColor: "pink",
        color: "white",
        border: "none",
        padding: "10px",
        borderRadius: "50%",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
};

export default SearchBar;
