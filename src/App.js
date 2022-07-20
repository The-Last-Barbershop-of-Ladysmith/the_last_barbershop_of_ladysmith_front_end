import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Layout from "./Layout/Layout";


import "./App.css";
import Header from "./Header/Header";

function App() {
  return (
    <Router>
      <Header/>
      <Routes>
        <Route path ="*" element={<Layout/>}/>
      </Routes>
    </Router>
  );
}

export default App;
