import React, { useEffect, useState } from "react";
import axios from "axios";

export default function EditScreen(props) {
  const [id, setId] = useState("");
  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios.get("http://localhost:5000/login").then((response) => {
      if (response.data.loggedIn === true) {
        setId(response.data.user[0].id);
      }
    });
  }, []);

  return (
    <div className="Editprofile">
      <form action="http://localhost:3000/EditProfile" method="POST">
        <label>Name:</label>
        <input name="name"></input>
        <input type="hidden" name="id" value={id}></input>
        <br></br>
        <br></br>
        <label>Last name:</label>
        <input name="lastname"></input>
        <br></br>
        <br></br>
        <label>Country:</label>
        <input name="country"></input>
        <br></br>
        <br></br>
        <label>Image:</label>
        <input name="image"></input>
        <br></br>
        <br></br>
        <label>Mobile:</label>
        <input name="mobile"></input>
        <br></br>
        <br></br>
        <label>Age:</label>
        <input type="number" min="13" max="100" name="age"></input>
        <br></br>
        <br></br>
        <label>About you:</label>
        <input type="text" className="aboutYou" name="aboutYou"></input>
        <br></br> <br></br>
        <button className="changeBtn" value="submit">
          Save changes
        </button>
      </form>
    </div>
  );
}
