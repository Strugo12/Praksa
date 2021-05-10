import Axios from "axios";

import React, { useState, useEffect } from "react";

export default function Register() {
  const [NameReg, setNameReg] = useState("");
  const [emailReg, setEmailReg] = useState("");
  const [adminpw, setAdminpw] = useState("");
  const [passwordReg, setPasswordReg] = useState("");
  const [message, setMessage] = useState("");
  Axios.defaults.withCredentials = true;

  const register = () => {
    Axios.post("http://localhost:5000/register", {
      name: NameReg,
      email: emailReg,
      password: passwordReg,
      adminpw: adminpw,
    }).then((response) => {
      if (response.data.message) {
        setMessage(response.data.message);
      }
    });
  };

  useEffect(() => {
    Axios.post("http://localhost:5000/register").then((response) => {
      if (response.data.message) {
        setMessage(response.data.message);
      }
    });
  }, []);

  return (
    <div className="form">
      <h1>Registration</h1>
      <label>Username:</label>
      <input
        className="input"
        type="text"
        required
        name="nameReg"
        onChange={(e) => {
          setNameReg(e.target.value);
        }}
      ></input>
      <br></br>

      <br></br>
      <label>Email:</label>
      <input
        className="input"
        type="text"
        required
        name="usernameReg"
        onChange={(e) => {
          setEmailReg(e.target.value);
        }}
      ></input>
      <br></br>
      <br></br>
      <label>Password:</label>
      <input
        className="input"
        required
        type="password"
        name="passwordReg"
        onChange={(e) => {
          setPasswordReg(e.target.value);
        }}
      ></input>
      <br></br>

      <br></br>
      <label>Admin password:</label>
      <input
        className="input"
        type="text"
        required
        name="usernameReg"
        onChange={(e) => {
          setAdminpw(e.target.value);
        }}
      ></input>
      <br></br>
      <p className="error"> {message} </p>
      <br></br>
      <button onClick={register} className="form-button">
        Register
      </button>
    </div>
  );
}
