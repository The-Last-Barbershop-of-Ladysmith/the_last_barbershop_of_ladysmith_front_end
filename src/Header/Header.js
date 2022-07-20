import React from "react";
import {useLocation} from "react-router-dom"
import "./Header.css";
import logo from "./logo/logo.png";

const Header = () => {
  const {pathname} = useLocation()
  return (
    <header className={pathname == "/schedule/date-selection"? 'headerSmall': "headerLarge" }>
      <img src={logo} />
      <h1>The Last Barbershop</h1>
    </header>
  );
};

export default Header;
