import React from 'react'

const Navbar = ({username, setUsername, setShowComponent}) => {
    const brandClick = () => {
        if(username){
            setShowComponent('Main');
        }
    }
    const allpostsClick = () => {
        setShowComponent('Main');
    }
    const followingClick = () => {
        setShowComponent('Followings');
    }
    const logoutClick = () => {
        setUsername('');
        setShowComponent('Login');
    }
    const loginClick = () => {
        setShowComponent('Login');
    }
    const registerClick = () => {
        setShowComponent('Register');
    }
    const usernameClick = () =>{
        setUsername(username);
        setShowComponent('Profile');
    }

    return (
        <nav id='navbar' class="navbar navbar-expand-lg navbar-light bg-light">
            <a class="navbar-brand" onClick={brandClick}>Network</a>
            
            <div>
                <ul class="navbar-nav mr-auto">
                    {username ?
                        <>
                        <li class="nav-item">
                            <a class="nav-link" onClick={usernameClick}><strong id="request_username">{username}</strong></a>
                        </li>
                        <li class="nav-item">
                            <a id="all-posts-link" class="nav-link" onClick={allpostsClick}>All Posts</a>
                        </li>
                        <li class="nav-item">
                            <a id="following-link" class="nav-link" onClick={followingClick}>Following</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" onClick={logoutClick}>Logout</a>
                        </li>
                        </>
                        :
                        <>
                        <li class="nav-item">
                            <a class="nav-link" onClick={loginClick}>Login</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" onClick={registerClick}>Register</a>
                        </li>
                        </>
                    }
                </ul>
            </div>
        </nav>
    )
}

export default Navbar