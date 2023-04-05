import React from 'react';
import './ReviewItem.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

const ReviewItem = ({product, handleRemoveFromCart}) => {
    const {id, img, name, price, quantity} = product;
    return (
        <div className='review-item'>
            <img src={img} alt="" />
            <div className='review-info'>
                <p className='product-title'>{name}</p>
                <p>Price: <span className='text-orange'>${price}</span></p>
                <p>Order Quantity: <span className='text-orange'>{quantity}</span></p>
            </div>
            <button onClick={() => handleRemoveFromCart(id)} className='delete-btn'><FontAwesomeIcon className='delete-icon' icon={faTrashAlt} /></button>
        </div>
    );
};

export default ReviewItem;