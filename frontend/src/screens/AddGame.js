import React from "react";
import Axios from "axios";

export default function AddGame() {
  Axios.defaults.withCredentials = true;

  return (
    <div>
      <div className="form">
        <h1>Add new game</h1>
        <form
          action="http://localhost:3000/AddGame"
          method="POST"
          enctype="multipart/form-data"
        >
          <label>Name:</label>
          <input className="input" type="text" name="name" required></input>
          <br></br>
          <br></br>
          <label>Genre:</label>
          <select name="genre">
            <option value="Sandbox">Sandbox</option>
            <option value="Real-time strategy">Real-time strategy </option>
            <option value="Shooter">Shooter</option>
            <option value="MOBA">MOBA</option>
            <option value="Role-playing">Role-playing</option>
            <option value="Simulation and sports">Simulation and sports</option>
            <option value="Puzzles">Puzzles</option>
            <option value="Survival and horror">Survival and horror</option>
          </select>
          <br></br>
          <br></br>
          Platfrom:
          <select name="platform">
            <option value="PC">PC</option>
            <option value="PS 3">PS 3 </option>
            <option value="PS 4">PS 4</option>
            <option value="PS 5">PS 5</option>
            <option value="Xbox">Xbox</option>
          </select>
          <br></br>
          <br></br>
          <label>Description:</label>
          <input
            className="input"
            type="text"
            name="description"
            required
          ></input>
          <br></br>
          <br></br>
          <label>Price:</label>
          <input className="input" type="text" name="price" required></input>
          <br></br>
          <br></br>
          <label>Image:</label>
          <input type="text" name="image" className="input" />
          <br></br>
          <br></br>
          <button type="submit" className="form-button">
            Add game
          </button>
        </form>
      </div>
    </div>
  );
}
