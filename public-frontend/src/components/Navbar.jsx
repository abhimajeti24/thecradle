import React from "react";


const Navbar = () => {
  return (
    <nav className="nav">
      <div className="nav-container">
        <div className="nav-img-container"></div>
        <div className="nav-links-container">
            <a href="#">About us</a>
            <a href="#">Programs</a>
            <a href="#">Gallery</a>
            <a href="#">Admissions</a>
            <a href="#">Contact us</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
