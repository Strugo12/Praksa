import axios from "axios";
import React, { useEffect, useState } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import AddGame from "./screens/AddGame";
import HomeScreen from "./screens/HomeScreen";
import Login from "./screens/Login";
import ProductScreen from "./screens/ProductScreen";
import Register from "./screens/Register";
import Profile from "./screens/Profile";
import EditScreen from "./screens/EditProfile";
import Logout from "./screens/Logout";

function App() {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [id, setId] = useState("");
  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios.get("http://localhost:3000/login").then((response) => {
      if (response.data.loggedIn === true) {
        setName(response.data.user[0].name);
        setId(response.data.user[0].id);
        setRole(response.data.user[0].role);
      }
    });
  }, []);

  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="row">
          <div>
            {name.length > 0 && (
              <a className="brand" href="/">
                Welcome {name}
              </a>
            )}
            {name.length === 0 && (
              <a className="brand" href="/">
                Homepage
              </a>
            )}
          </div>
          {name.length === 0 && (
            <div>
              <a href="/login">Login</a>
              <a href="/register">Register</a>
            </div>
          )}

          {name.length > 0 && (
            <div>
              <a href="/logout">Logout</a>
              {role == "admin" && <a href="/AddGame">Add game</a>}

              <a href={`/profile/${id}`}>My profile</a>
            </div>
          )}
        </header>

        <main>
          <Route path="/logout" component={Logout}></Route>
          <Route path="/login" component={Login}></Route>
          <Route path="/register" component={Register}></Route>
          <Route path="/product/:id" component={ProductScreen}></Route>
          <Route path="/" component={HomeScreen} exact></Route>
          <Route path="/AddGame" component={AddGame}></Route>
          <Route path="/profile" component={Profile}></Route>
          <Route path="/editprofile" component={EditScreen}></Route>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
