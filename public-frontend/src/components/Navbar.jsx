import React from "react";

import { Link } from "react-router-dom";



const Navbar = () => {
  return (
    <nav className="nav">
      <div className="nav-container">
        <div className="nav-img-container"></div>
        <div className="nav-links-container">
            <Link to="/">About us</Link>
            <Link to="/programs">Programs</Link>
            <Link to="/gallery">Gallery</Link>
            <Link to="/admissions">Admissions</Link>
            <Link to="/admissions">Contact us</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
