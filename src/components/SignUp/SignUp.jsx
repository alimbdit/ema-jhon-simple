import React, { useContext, useState } from 'react';
import './SignUp.css';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthProvider';

const SignUp = () => {

    const {createUser} = useContext(AuthContext);

    const [error, setError] = useState('');

    const handleSignUp = event => {
        event.preventDefault();

        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        const confirm = form.confirm.value;

        console.log(email, password, confirm)
        
        setError('')

        if(password !== confirm){
            setError('Password does not match')
            return;
        }
        if(password.length < 6){
            setError('Password must be 6 character or longer')
            return;
        }


        createUser(email, password)
        .then(result => {
            const loggedUser = result.user;
            console.log(loggedUser)
        })
        .catch(error=>{
            setError(error.message)
            console.log(error.message)
        })

    }

    return (
        <div className='form-container'>
            <h1 className='form-title'>Sign Up</h1>
            <form onSubmit={handleSignUp}>
                <div className="form-control">
                    <label htmlFor="email">Email</label>
                    <input type="email" className="email"  name='email'  required/>
                </div>
                <div className="form-control">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="password"  name='password'  required/>
                </div>
                <div className="form-control">
                    <label htmlFor="confirm">Confirm Password</label>
                    <input type="password" className="password"  name='confirm'  required/>
                </div>

                <input className='btn-submit' type="submit" value="Sign Up" />
            </form>
            <p className='toggle-way'><small>Already have an account? <Link to='/login'>Login</Link></small></p>

            <p className='text-error'>{error} </p>
        </div>
    );
};

export default SignUp;