import Axios from "axios";

import React, { useEffect, useState } from "react";

export default function Login() {
  return (
    <div className="form">
      <h1>Login</h1>
      <form action="http://localhost:3000/login" method="POST">
        <label>Email:</label>
        <input className="input" type="text" name="email"></input>
        <br></br>
        <label>Password:</label>
        <input className="input" type="password" name="password"></input>

        <br></br>

        <button className="form-button">Login</button>
      </form>
    </div>
  );
}
