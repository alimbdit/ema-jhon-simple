import React from 'react';
import './Cart.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
const Cart = ({cart, handleClearCart, children}) => {
    // console.log(cart);
    let totalPrice = 0;
    let shippingPrice = 0;
    let quantity = 0;
    for (const product of cart){
        // if(product.quantity === 0){
        //     product.quantity = 1;
        // }

        // product.quantity = product.quantity || 1;

        totalPrice = totalPrice + product.price * product.quantity;
        shippingPrice = shippingPrice + product.shipping *product.quantity;
        quantity = quantity + product.quantity;
    }
    const tax = totalPrice*.07;
    const grandTotal = totalPrice + shippingPrice + tax;
    return (
        <div className='cart'>
            <h4 style={{marginTop:'0', textAlign:'center'}}>order summary</h4>
        <p>Selected items: {quantity}</p>
        <p>Total Price: ${totalPrice}</p>
        <p>Total Shipping: ${shippingPrice}</p>
        <p>Tax: ${tax.toFixed(2)}</p>
        <h5>Grand Total: ${grandTotal.toFixed(2)}</h5>
        <button className='clear-cart' onClick={handleClearCart}>
            Clear Cart
            <FontAwesomeIcon className='' icon={faTrashAlt} />
            </button>
            {children}
        </div>
    );
};

export default Cart;