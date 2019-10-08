import React from 'react';

import './App.css';
import Route from "./routes";

import logo from './assets/logo.svg'; //Importa logo do AirCnC

function App() {

  return (
    <div className="container">
      <img src={logo} alt="AirCnC"/>

      <div className="content">
        <Route />
      </div>

    </div>
  );
}

export default App;
