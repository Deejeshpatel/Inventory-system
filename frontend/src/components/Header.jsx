import React from "react";
import { Link } from "react-router-dom";
import logo from '../assets/logo.png';
import './Header.css'; // Import the CSS file

const Header = () => {
    return (
        <header>
            <nav>
                <div className="flex items-center">
                    <img src={logo} alt="logo" className="logo" />
                </div>
                <div className="space-x-6 flex items-center">
                    <Link to="/addinventory" className="nav-link">Add Inventory</Link>
                    <Link to="/addsupplier" className="nav-link">Add Supplier</Link>
                    <Link to="/" className="nav-link">Inventorys</Link>
                    <Link to="/supplier" className="nav-link">Suppliers</Link>
                </div>
            </nav>
        </header>
    );
};

export default Header;

