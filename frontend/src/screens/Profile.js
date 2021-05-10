import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ProductScreen(props) {
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [country, setCountry] = useState("");
  const [mobile, setMobile] = useState("");
  const [age, setAge] = useState("");
  const [aboutYou, setAboutYou] = useState("");
  const [image, setImage] = useState("");
  const [id, setId] = useState("");
  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios.get("http://localhost:5000/login").then((response) => {
      if (response.data.loggedIn === true) {
        setName(response.data.user[0].name);
        setId(response.data.user[0].id);
        setImage(response.data.user[0].image);
        setLastname(response.data.user[0].lastname);
        setCountry(response.data.user[0].country);
        setMobile(response.data.user[0].mobile);
        setAge(response.data.user[0].age);
        setAboutYou(response.data.user[0].aboutyou);
      }
    });
  }, []);

  return (
    <div>
      <h1 className="profileHeader">{name}'s profile</h1>
      <div className="grid-container imageProfile">
        <img src={image}></img>
      </div>

      <div className="profile">
        <div className="profile-info">
          <br></br>
          <label>Name:</label>
          <input value={name}></input>
          <br></br>
          <br></br>
          <label>Last name:</label>
          <input value={lastname}></input>
          <br></br>
          <br></br>
          <label>Country:</label>
          <input value={country}></input>
          <br></br>
          <br></br>
          <label>Image:</label>
          <input value={image}></input>
          <br></br>
          <br></br>
          <label>Mobile:</label>
          <input value={mobile}></input>
          <br></br>
          <br></br>
          <label>Age:</label>
          <input value={age}></input>
          <br></br>
          <br></br>
          <label>About you:</label>
          <input
            type="text"
            className="aboutYou"
            name="aboutYou"
            value={aboutYou}
          ></input>
          <br></br> <br></br>
          <a href="/editprofile">
            <button className="changeBtn" value="submit">
              Edit profile
            </button>
          </a>
        </div>
      </div>
    </div>
  );
}
