import React from "react";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {

    return (
        <nav style={styles.navbar}>
            <ul style={styles.navList}>
                <li><Link to="/" style={styles.homeItem}>trade_at</Link></li>
                <li><Link to="/chart" style={styles.chartItem}>| View Chart</Link></li>
            </ul>
        </nav>
    );
};

const styles = {
    navbar: {
        backgroundColor: "#191c27",
        padding: "1rem",
    },
    navList: {
        listStyleType: "none",
        display: "flex",
        justifyContent: "flex-start", // 맨 왼쪽 정렬
        margin: 0,
        padding: 0,
    },
    homeItem: {
        color: "white",
        textDecoration: "none",
        margin: "0 0rem",
        fontSize: "1.5rem", // 크기 키움
        fontWeight: "bold", // 두껍게

    },
    chartItem: {
        color: "gray", // 회색
        textDecoration: "none",
        margin: "0 1rem",
        lineHeight: "2.4rem",
    },

};

export default Navbar;
