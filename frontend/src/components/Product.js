import React from "react";
import Rating from "./Rating";

export default function Product(props) {
  const { product } = props;
  return (
    <div key={product.id} className="card">
      <a href={`/product/${product.id}`}>
        <img className="medium" src={`${product.image}`} />
      </a>
      <div className="card-body">
        <a href={`/product/${product.id}`}>
          <h3>{product.name}</h3>
        </a>
        <span>Genre: {product.genre}</span>
        <Rating
          rating={product.rating}
          numReviews={product.numReviews}
        ></Rating>
        <div className="price">{product.price} €</div>
      </div>
    </div>
  );
}
