import React, { useState } from "react";
import ReactDOM from "react-dom";
import padlock from "./img/padlock.png";
import logo from "./img/logo.png"

import "./styles.css";

function App() {
  // React States
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // User Login info
  const database = [
    {
      username: "admin",
      password: "admin"
    },
    {
      username: "frank",
      password: "12345"
    }
  ];

  const errors = {
    uname: "Nombre de usuario invalido",
    pass: "Password invalido"
  };

  const handleSubmit = (event) => {
    //Prevent page reload
    event.preventDefault();

    var { uname, pass } = document.forms[0];

    // Find user login info
    const userData = database.find((user) => user.username === uname.value);

    // Compare user info
    if (userData) {
      if (userData.password !== pass.value) {
        // Invalid password
        setErrorMessages({ name: "pass", message: errors.pass });
      } else {
        setIsSubmitted(true);
      }
    } else {
      // Username not found
      setErrorMessages({ name: "uname", message: errors.uname });
    }
  };

  // Error message
  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );

  //login form
  const renderForm = (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <input type="text" name="uname" placeholder="Usuario" required />
          {renderErrorMessage("uname")}
        </div>
        <div className="input-container">    
          <input type="password" name="pass" placeholder="Password" required />
          {renderErrorMessage("pass")}
        </div>
        <div className="button-container">
          <button type="submit" > Ingresar</button>
        </div>
      </form>
    </div>
  );

  return (
    <div className="app">
      <div className="img-logo"><img src={logo}></img></div>
      <div className="login-form">
        <div className="title">Login Admin</div>
        <div className="img-padlock"><img src={padlock}></img></div>
        {isSubmitted ? <div className="greeting">Bienvenido!</div> : renderForm}
      </div>
    </div>
  );
}

export default App;