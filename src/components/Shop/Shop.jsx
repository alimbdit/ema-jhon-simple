import React, {useEffect, useState} from "react";
import { addToDb, getShoppingCart } from "../../utilities/fakedb";
import Cart from "../Cart/Cart";
import Product from "../Product/Product";
import "./Shop.css";

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] =useState([]);



    const handleAddToCart = (product) => {
        // const newCart = [...cart, product];

        let newCart = [];
        

        const exists = cart.find(pd => pd.id == product.id);

        // if product doesn't  exist in the cart, then set quantity = 1
        // if exist update quantity by 1

        if(!exists) {
          product.quantity = 1;
          newCart = [...cart, product];
        }
        else{
          exists.quantity = exists.quantity + 1;
          const remaining = cart.filter(pd => pd.id !== product.id);
          newCart=[...remaining, exists]
        }
    
        setCart(newCart);
        addToDb(product.id);
    }

    
    useEffect(()=>{
      const storedCart = getShoppingCart();
      const savedCart = [];
      // step1: get id from storedCart
      for (const id in storedCart){
        // step2: get the addedProduct
        const addedProduct = products.find(product => product.id === id);

        // step3: get and set quantity
        if(addedProduct){
          const quantity = storedCart[id];
          addedProduct.quantity = quantity;

          // step 4: add addedProduct in savedCart;
          savedCart.push(addedProduct);
        }
      }
      // step 5: set the savedCart as setCart
      setCart(savedCart);

    }, [products])

    useEffect( () => {
        fetch('products.json')
        .then(res=>res.json())
        .then(data=>setProducts(data))
    }, [])
    // console.log(products.map(product => product.quantity))

   


  return (
    <div className="shop-container">
      <div className="products-container">
        {
            products.map((product)=><Product
            key={product.id}
            product={product}
            handleAddToCart={handleAddToCart}></Product>)
        }
      </div>
      <div className="cart-container">
        <Cart cart={cart}></Cart>
      </div>
    </div>
  );
};

export default Shop;
