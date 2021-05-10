import React, { useEffect, useState } from "react";
import axios from "axios";
import Product from "../components/Product";

export default function HomeScreen() {
  const [products, setProducts] = useState([]);

  axios.defaults.withCredentials = true;

  useEffect(() => {
    const fecthData = async () => {
      const { data } = await axios.get("/products");
      setProducts(data);
    };
    fecthData();
  }, []);

  return (
    <div>
      <div className="row center">
        {products.map((product) => (
          <Product key={product.id} product={product}></Product>
        ))}
      </div>
      <footer className="row center footer">All right reserved</footer>
    </div>
  );
}
