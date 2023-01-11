import React from "react";
import {useLocation} from "react-router-dom"
import "./Header.css";
import logo from "./logo/logo.png";
import Navigation from "./Navigation";

const Header = () => {
  const {pathname} = useLocation()
  const atHomePage = pathname === "/"
  return (
    <header className={atHomePage? 'headerLarge': "headerSmall" }>
      {atHomePage?<img src={logo} />: <Navigation/>}
    </header>
  );
};

export default Header;
