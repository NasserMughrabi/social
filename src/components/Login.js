import React from 'react'
import { useState, useRef } from 'react';
import CSRFToken from './CSRFToken';

const Login = ({setLogUsername, setShowComponent, setUsername}) => {

    const [user, setUser] = useState('');
    const [loginStatus, setLoginStatus] = useState('');
    const usernameEl = useRef(null);
    const passwordEl = useRef(null);

    const handleClick = () => {
        setShowComponent('Register');
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const username = usernameEl.current.value;
        setUser(username);
        const password = passwordEl.current.value;
        fetch('api/login', {
                method: 'POST',
                body: JSON.stringify({
                    username: username,
                    password: password
                })
            })
            .then(response => response.json())
            .then(result => {setLoginStatus(result)});
    }


    if(loginStatus === 'success'){
        setLogUsername(user);
        setUsername(user);
        setShowComponent('Main');
    } 

    return (
    <>
        <h2>Login</h2>
        {loginStatus === 'fail' && <div style={{color: 'red'}}>Incorrect username and/or password</div>}
        <form action="" method="post"  onSubmit={handleSubmit}>
            <CSRFToken />
            <div class="form-group">
                <input ref={usernameEl} autofocus class="form-control" type="text" name="username" placeholder="Username"></input>
            </div>
            <div class="form-group">
                <input ref={passwordEl} class="form-control" type="password" name="password" placeholder="Password"></input>
            </div>
            <input class="btn btn-primary" type="submit" value="Login"></input>
        </form>

        Don't have an account? <a href='#' onClick={handleClick}>Register here.</a>
    </>
    );  
}

export default Login