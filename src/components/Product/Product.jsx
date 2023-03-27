import React from "react";
import "./Product.css";

const Product = ({ product }) => {
  console.log(product);
  const { img, name, price, seller, ratings } = product;
  return (
    <div className="product">
      <div className="product-img">
        <img src={img ? img : ""} alt="" />
      </div>
      <div className="product-details">
        <h6 className="product-name">{name}</h6>
        <p>Price: {price}</p>
        <p>Manufacturer: {seller}</p>
        <p>Rating: {ratings} Stars</p>
      </div>
      <button className="cart-btn">Add to Cart</button>
    </div>
  );
};

export default Product;
