import React from 'react'
import Navbar from './Navbar';
import Followings from './Followings';
import Main from './Main';
import Register from './Register'
import { useState, useRef } from 'react';
import CSRFToken from './CSRFToken';

const Login = () => {

    const [loginStatus, setLoginStatus] = useState('');
    const [showRegister, setShowRegister] = useState(false);
    const [showComponent, setShowComponent] = useState('');
    const [username, setUsername] = useState('');
    const usernameEl = useRef(null);
    const passwordEl = useRef(null);
    const handleClick = () => {
        setShowRegister(true);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const username = usernameEl.current.value;
        setUsername(username);
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

    if(showComponent){
        if (showComponent === 'Login'){
            return <Login />;
        } else if (showComponent === 'Followings') {
            return <Followings />;
        } else if (showComponent === 'Register') {
            return <Register />;
        }
    }
    if(loginStatus === 'success'){
        return <Main username={username}/>
    } 
    if(showRegister){
        return <Register />;
    }
    return (
    <>
        <Navbar username={''} setShowComponent={setShowComponent}/>
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