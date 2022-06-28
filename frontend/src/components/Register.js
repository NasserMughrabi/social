import React from 'react'
import Login from './Login';
import { useState } from 'react';

const Register = () => {

    const [showRegister, setShowRegister] = useState(true);
    const handleClick = () => {
        setShowRegister(false);
    }

    if(!showRegister){
        return <Login />
    }
    return (
        <>
            <h2>Register</h2>
            <form action="{% url 'register' %}" method="post">
                <div class="form-group">
                    <input class="form-control" autofocus type="text" name="username" placeholder="Username"></input>
                </div>
                <div class="form-group">
                    <input class="form-control" type="email" name="email" placeholder="Email Address"></input>
                </div>
                <div class="form-group">
                    <input class="form-control" type="password" name="password" placeholder="Password"></input>
                </div>
                <div class="form-group">
                    <input class="form-control" type="password" name="confirmation" placeholder="Confirm Password"></input>
                </div>
                <input class="btn btn-primary" type="submit" value="Register"></input>
            </form>

            Already have an account? <a href="#" onClick={handleClick}>Log In here.</a>
        </>
    )
}

export default Register