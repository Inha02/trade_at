import React from "react";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
    return (
        <nav style={styles.navbar}>
            <ul style={styles.navList}>
                <li><Link to="/" style={styles.navItem}>Home</Link></li>
                <li><Link to="/chart" style={styles.navItem}>View Chart</Link></li>
            </ul>
        </nav>
    );
};

const styles = {
    navbar: {
        backgroundColor: "#333",
        padding: "1rem",
    },
    navList: {
        listStyleType: "none",
        display: "flex",
        justifyContent: "center",
        margin: 0,
        padding: 0,
    },
    navItem: {
        color: "white",
        textDecoration: "none",
        margin: "0 1rem",
    },
};

export default Navbar;
