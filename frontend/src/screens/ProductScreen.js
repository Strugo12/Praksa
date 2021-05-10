import React, { useEffect, useState } from "react";
import axios from "axios";
import Rating from "../components/Rating";
import Comments from "../components/Comments";

export default function ProductScreen(props) {
  const [product, setProduct] = useState([]);
  const [name, setName] = useState("");

  const [userId, setId] = useState("");
  const [commented, setCommented] = useState("");
  const id = props.match.params.id;
  axios.defaults.withCredentials = true;

  useEffect(() => {
    const fecthData = async () => {
      const { data } = await axios.get(`/product/${id}`);
      setProduct(data);
    };
    fecthData();
  }, []);

  useEffect(() => {
    axios.get("http://localhost:5000/login").then((response) => {
      if (response.data.loggedIn === true) {
        setName(response.data.user[0].name);
        setId(response.data.user[0].id);
      }
    });
  }, []);

  useEffect(() => {
    axios.get(`http://localhost:5000/CheckComment/${id}`).then((response) => {
      setCommented(response.data.comment);
    });
  }, []);

  return (
    <div>
      {product.map((game) => (
        <div className="row top" key={game.id}>
          <div className="col-2">
            <img className="large" src={game.image}></img>
          </div>
          <div className="col-1">
            <ul>
              <li>
                <h1>{game.name}</h1>
              </li>
              <li>Genre: {game.genre}</li>
              <li>
                <Rating
                  rating={game.rating}
                  numReviews={game.numReviews}
                ></Rating>
              </li>
              <li>Pirce:{game.price} $</li>
              <li>
                Description: {game.description}
                <br></br>
                <br></br>
              </li>
              {name.length > 0 && commented === 0 && (
                <li>
                  <form
                    className="addComment"
                    action="http://localhost:3000/AddComment"
                    method="POST"
                  >
                    <h3> {name}, Left your comment & review</h3>
                    <input
                      name="body"
                      placeholder="Enter your comment here..."
                    ></input>
                    <input type="hidden" name="userId" value={userId}></input>
                    <input type="hidden" name="gameId" value={game.id}></input>
                    <input type="hidden" name="username" value={name}></input>
                    <br></br>
                    <br></br>Rating:
                    <select name="rating" className="Addrating">
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                    </select>
                    <br></br>
                    <button className=" addbtn">Add comment and review</button>
                  </form>
                </li>
              )}
              {name.length === 0 && (
                <li>
                  <h2>You must log in to leave a comment and review...</h2>
                </li>
              )}
              {commented === 1 && name.length > 0 && (
                <li>
                  <form
                    action="http://localhost:3000/DeleteComment"
                    method="POST"
                  >
                    <input type="hidden" name="username" value={name}></input>
                    <input type="hidden" name="userId" value={userId}></input>
                    <input type="hidden" name="gameId" value={game.id}></input>
                    <button className=" addbtn">
                      Delete your comment and review
                    </button>
                  </form>
                </li>
              )}
            </ul>
          </div>
          <br></br>
        </div>
      ))}
      <br></br>
      <br></br>
      <br></br>
      <br></br>

      {product.map((game) => (
        <div className="comments">
          <Comments id={game.id}></Comments>
        </div>
      ))}
      <br></br>
      <br></br>
    </div>
  );
}
