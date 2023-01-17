import React from "react";
import logo from "../Pictures/logo.png";
import { motion } from "framer-motion"

import "./Header.css";


const Header = () => {
  return (
    <header className="col-lg-3">
      <motion.nav className="navbar navbar-dark navbar-expand-lg mx-3">
        <a className="navbar-brand" href="/">
          <img src={logo} alt="last barbershop" />
          <h1>The Last Barbershop</h1>
        </a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav ">
            <li className="nav-item active">
              <a className="nav-link" href="/">Home <span className="sr-only">(current)</span></a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/">Features</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/">Pricing</a>
            </li>
            <li className="nav-item">
              <a className="nav-link disabled" href="/">Disabled</a>
            </li>
          </ul>
        </div>
      </motion.nav>
    </header>
  );
};

export default Header;
