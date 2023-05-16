import React, {useEffect, useState} from "react";
import { addToDb, deleteShoppingCart, getShoppingCart } from "../../utilities/fakedb";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import Cart from "../Cart/Cart";
import Product from "../Product/Product";
import "./Shop.css";
import { Link, useLoaderData } from "react-router-dom";

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] =useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(10)

    const {totalProducts} = useLoaderData();
    
    // const itemsPerPage = 10;  //TODO: make it dynamic
    const totalPages = Math.ceil(totalProducts / itemsPerPage);

    

    // console.log(totalProducts)


    const pageNumbers = [...Array(totalPages).keys()]

    // const pageNumbers = [];
    // for(let i = 0; i < totalPages; i++){
    //   pageNumbers.push(i)
    // }


    /**
     * Done: 1. Determine the total number of items
     * TODO: 2. Decide on the number of items per page:
     * DONE: 3. Calculate the total number of pages: 
     * DONE: 4. Determine the current page:
     * **/ 



    const handleAddToCart = (product) => {
        // const newCart = [...cart, product];

        let newCart = [];
        

        const exists = cart.find(pd => pd._id == product._id);

        // if product doesn't  exist in the cart, then set quantity = 1
        // if exist update quantity by 1

        if(!exists) {
          product.quantity = 1;
          newCart = [...cart, product];
        }
        else{
          exists.quantity = exists.quantity + 1;
          const remaining = cart.filter(pd => pd._id !== product._id);
          newCart=[...remaining, exists]
        }
    
        setCart(newCart);
        addToDb(product._id);
    }

    const handleClearCart = () => {
      setCart([]);
      deleteShoppingCart();
    }

    
    useEffect(()=>{
      const storedCart = getShoppingCart();
      const ids = Object.keys(storedCart)

       fetch('http://localhost:5000/productsByIds', {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify(ids)
    })
    .then(res => res.json())
    .then(cartProducts => {
      const savedCart = [];
      // step1: get id from storedCart
      for (const id in storedCart){
        // step2: get the addedProduct
        const addedProduct = cartProducts.find(product => product._id === id);

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
    })

      

    }, [])



    // load all data without pagination

    // useEffect( () => {
    //     fetch('http://localhost:5000/products')
    //     .then(res=>res.json())
    //     .then(data=>setProducts(data))
    // }, [])

    
    // loading data for pagination using axios 

    // useEffect(() => {
    //   const fetchData = async () => {
    //     const response = await axios.get(
    //       `http://localhost:5000/products?page=${currentPage}&limit=${itemsPerPage}`
    //     );
    //     setProducts(response.data);
    //   };
    //   fetchData();
    // }, [currentPage, itemsPerPage]);



    // loading data for pagination using fetch
    useEffect(() => {
      const fetchData = async () => {
        const response = await fetch(
          `http://localhost:5000/products?page=${currentPage}&limit=${itemsPerPage}`
        );
        const data = await response.json()
        setProducts(data);
      };
      fetchData();
    }, [currentPage, itemsPerPage]);

    // console.log(products.map(product => product.quantity))


    const options = [6, 12, 21]
    const handlePageChange = (event) => {
      setItemsPerPage(parseInt(event.target.value));
      setCurrentPage(0);
    };


  return (
    <>
    <div className="shop-container">
      <div className="products-container">
        {
            products.map((product)=><Product
            key={product._id}
            product={product}
            handleAddToCart={handleAddToCart}></Product>)
        }
      </div>
      <div className="cart-container">
        <Cart 
        cart={cart}
        handleClearCart={handleClearCart}
        >
          <Link className="proceed-link" to='/orders'>
            <button className="btn-proceed">
                Review Order
                <FontAwesomeIcon className='' icon={faArrowRight} />
            </button>
          </Link>
        </Cart>
      </div>
    </div>

    {/* pagination */}
    <div className="pagination">
      {/* <p>current page: {currentPage}</p>
      <p> pages number: {pageNumbers}</p>
      <p> total pages: {totalPages}</p>
      <p> items Per Page: {itemsPerPage}</p>
      <p> total products: {totalProducts}</p> */}
      {
        pageNumbers.map(number => <button 
          key={number}
          className={ currentPage === number ? 'selected' : ''}
          onClick={() => setCurrentPage(number)}
          >{number}</button>)
      }
      <select value={itemsPerPage} onChange={handlePageChange}>
        {
          options.map(option => (
              <option key={option} value={option}>
                {option}
              </option>
          ))
        }
      </select>
    </div>
    </>
  );
};

export default Shop;
