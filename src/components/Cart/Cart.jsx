import React from 'react';
import './Cart.css'
const Cart = ({cart}) => {
    console.log(cart);
    let totalPrice = 0;
    let shippingPrice = 0;
    for (const product of cart){
        totalPrice = totalPrice + product.price;
        shippingPrice = shippingPrice + product.shipping;
    }
    const tax = totalPrice*.07;
    const grandTotal = totalPrice + shippingPrice + tax;
    return (
        <div className='cart'>
            <h4 style={{marginTop:'0', textAlign:'center'}}>order summary</h4>
        <p>Selected items: {cart.length}</p>
        <p>Total Price: ${totalPrice}</p>
        <p>Total Shipping: ${shippingPrice}</p>
        <p>Tax: ${tax.toFixed(2)}</p>
        <h6>Grand Total: ${grandTotal.toFixed(2)}</h6>
        </div>
    );
};

export default Cart;