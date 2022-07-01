import React from 'react'
import Navbar from './Navbar';
import Followings from './Followings';
import Login from './Login';
import CSRFToken from './CSRFToken';
import { useState, useRef } from 'react';


const Register = ({setLogUsername, setShowComponent, setUsername}) => {

    const usernameEl = useRef(null);
    const passwordEl = useRef(null);
    const passwordConfEl = useRef(null);
    const emailEl = useRef(null);
    const [matchPass, setMatchPass] = useState(true);
    const [registerStatus, setRegisterStatus]  = useState('');
    const [user, setUser] = useState('');

    const handleClick = () => {
        setShowComponent('Login');
    }
    const handleSubmit = (e) => {
        // fetch data and post to the server database
        e.preventDefault();
        const username = usernameEl.current.value;
        setUser(username);
        const password = passwordEl.current.value;
        const passwordConf = passwordConfEl.current.value;
        const email = emailEl.current.value;
        if(password !== passwordConf) {
            setMatchPass(false);
            return;
        }
        fetch('api/register', {
                method: 'POST',
                body: JSON.stringify({
                    username: username,
                    password: password,
                    email: email
                })
            })
            .then(response => response.json())
            .then(result => {setRegisterStatus(result)});
    }

    if(registerStatus === 'success'){
        setLogUsername(user);
        setUsername(user);
        setShowComponent('Main');
    } 

    return (
        <>
            <h2>Register</h2>
            {matchPass || <div>Passwords must match.</div> }
            <form action="" onClick={handleSubmit} method="post">
                <CSRFToken />
                <div class="form-group">
                    <input ref={usernameEl} class="form-control" autofocus type="text" name="username" placeholder="Username"></input>
                </div>
                <div class="form-group">
                    <input ref={emailEl} class="form-control" type="email" name="email" placeholder="Email Address"></input>
                </div>
                <div class="form-group">
                    <input ref={passwordEl} class="form-control" type="password" name="password" placeholder="Password"></input>
                </div>
                <div class="form-group">
                    <input ref={passwordConfEl} class="form-control" type="password" name="confirmation" placeholder="Confirm Password"></input>
                </div>
                <input class="btn btn-primary" type="submit" value="Register"></input>
            </form>

            Already have an account? <a href="#" onClick={handleClick}>Login here.</a>
        </>
    )
}

export default Register