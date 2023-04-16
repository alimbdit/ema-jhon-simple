import React, { useContext, useState } from 'react';
import './Login.css';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthProvider';

const Login = () => {

    const [error, setError] = useState('');
    const {signIn} = useContext(AuthContext)

    const handleLogin = event => {
        event.preventDefault();

        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        
        setError('')

        signIn(email, password)
        .then(result=>{
            const loggedUser = result.user;
            console.log(loggedUser);
            form.reset()
        })
        .catch(error=> {
            setError(error.message);
            console.error(error.message)
        })

        console.log(email, password)
    }

    return (
        <div className='form-container'>
            <h1 className='form-title'>Login</h1>
            <form onSubmit={handleLogin} >
                <div className="form-control">
                    <label htmlFor="email">Email</label>
                    <input type="email" className="email"  name='email'  required/>
                </div>
                <div className="form-control">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="password"  name='password'  required/>
                </div>

                <input className='btn-submit' type="submit" value="Login" />
            </form>
            <p className='toggle-way'><small>New to Ema-john? <Link to='/signup'> Create New Account</Link></small></p>

            <p className='text-error'>{error} </p>
        </div>
    );
};

export default Login;