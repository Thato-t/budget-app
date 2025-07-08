import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './navbar.scss'

function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };
    
    return (
        <>
            <div className="navbar-wrapper">
                <div className="navbar-containerOne">
                    <p className="navbar-logo">Expensify</p>
                </div>
                <div className="navbar-containerTwo">
                    <div className={`burger-menu ${isMenuOpen ? 'active' : ''}`} onClick={toggleMenu}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                    <div className={`navbar-navigation ${isMenuOpen ? 'active' : 'hide'}`}>
                        <ul className="nav">
                            <Link to="/home" className="nav-links" onClick={toggleMenu}><li className="options">Home</li></Link>
                            <Link to="/reports" className="nav-links" onClick={toggleMenu}><li className="options">Reports</li></Link>
                            <Link to="/settings" className="nav-links" onClick={toggleMenu}><li className="options settings">Settings</li></Link>
                        </ul>
                    </div>
                </div>
            </div>
            {/* {isMenuOpen && <div className="mobile-overlay" onClick={toggleMenu}></div>} */}
        </>
    )
}

export default Navbar