import React from 'react'

const Navbar = ({username, setShowComponent}) => {
    // const [showComponent, setShowComponent] = useState('');

    const brandClick = () => {
        setShowComponent('Main');
    }
    const allpostsClick = () => {
        setShowComponent('Main');
    }
    const followingClick = () => {
        setShowComponent('Followings');
    }
    const logoutClick = () => {
        setShowComponent('Login');
    }
    const loginClick = () => {
        setShowComponent('Login');
    }
    const registerClick = () => {
        setShowComponent('Register');
    }

    return (
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <a class="navbar-brand" onClick={brandClick}>Network</a>
            
            <div>
                <ul class="navbar-nav mr-auto">
                {username &&
                    <li class="nav-item">
                        <a class="nav-link" href="#"><strong id="request_username">{username }</strong></a>
                    </li>
                }

                <li class="nav-item">
                    <a id="all-posts-link" class="nav-link" onClick={allpostsClick}>All Posts</a>
                </li>
                
                {username ?
                    <>
                    <li class="nav-item">
                        <a id="following-link" class="nav-link" onClick={followingClick}>Following</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" onClick={logoutClick}>Log Out</a>
                    </li>
                    </>
                    :
                    <>
                    <li class="nav-item">
                        <a class="nav-link" onClick={loginClick}>Log In</a>
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