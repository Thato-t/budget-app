import React from 'react'
import { Link } from 'react-router-dom'
import './navbar.scss'
function Navbar() {
    
  return (
    <>
        <div className="navbar-wrapper">
            <div className="navbar-containerOne">
                <p className="navbar-logo">Budget App</p>
            </div>
            <div className="navbar-containerTwo">
                <div className="navbar-navigation">
                    <ul className="nav">
                        <Link to="/" className="nav-links"><li className="options">Home</li></Link>
                        <Link to="/reports" className="nav-links"><li className="options">Reports</li></Link>
                        <Link to="/settings" className="nav-links"><li className="options settings">Settings</li></Link>
                    </ul>
                </div>
            </div>
        </div>
    </>
  )
}

export default Navbar