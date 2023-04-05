import React from 'react';
import Lottie from "lottie-react";
import Error from '../../assets/404.json';
import './ErrorPage.css';

const ErrorPage = () => {
    return (
        <div className='error'>
            <Lottie className='error-page' animationData={Error} loop={true} />
        </div>
    );
};

export default ErrorPage;