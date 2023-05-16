import React, { useContext, useState } from 'react';
import './Login.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthProvider';

const Login = () => {

    const [show, setShow] = useState(false);
    const [error, setError] = useState('');
    const {signIn} = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || "/";
    console.log(from, location)

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
            navigate(from, { replace: true })
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
                    <input type={show ? "text" : "password"} className="password"  name='password'  required/>
                    <p onClick={()=>setShow(!show)}><small>{
                        show?<span>Hide password</span>: <span>Show Password</span>
                        }</small></p>
                </div>

                <input className='btn-submit' type="submit" value="Login" />
            </form>
            <p className='toggle-way'><small>New to Ema-john? <Link to='/signup'> Create New Account</Link></small></p>

            <p className='text-error'>{error} </p>
        </div>
    );
};

export default Login;