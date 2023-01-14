import React from "react";
import logo from "../Pictures/logo.png";
import { motion } from "framer-motion"

import "./Header.css";


const Header = () => {
  return (
    <header className="col-lg-3">
      <motion.nav class="navbar navbar-dark navbar-expand-lg mx-3">
        <a class="navbar-brand" href="/">
          <img src={logo} alt="last barbershop" />
          <h1>The Last Barbershop</h1>
        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul class="navbar-nav ">
            <li class="nav-item active">
              <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Features</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Pricing</a>
            </li>
            <li class="nav-item">
              <a class="nav-link disabled" href="#">Disabled</a>
            </li>
          </ul>
        </div>
      </motion.nav>
    </header>
  );
};

export default Header;
