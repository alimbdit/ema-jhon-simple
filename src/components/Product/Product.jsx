import React from "react";
import "./Product.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
  import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

const Product = ({ product, handleAddToCart }) => {
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
      <button onClick={() => handleAddToCart(product)} className="cart-btn">
        Add to Cart
        <FontAwesomeIcon style={{marginLeft:'5px'}} icon={faShoppingCart} />
        </button>
    </div>
  );
};

export default Product;
