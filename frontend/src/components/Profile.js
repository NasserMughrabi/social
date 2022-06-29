import React from 'react'
import Navbar from './Navbar';
import Followings from './Followings';
import Login from './Login';
import Register from './Register'
import { useState } from 'react';


const Profile = ({username}) => {

    // fetch users data
    // fetch users posts
    // display them as html
    const [showComponent, setShowComponent] = useState('');
    if(showComponent){
        if (showComponent === 'Login'){
            return <Login />;
        } else if (showComponent === 'Followings') {
            return <Followings />;
        } else if (showComponent === 'Register') {
            return <Register />;
        }
    }

    

    return (
        <>
            <Navbar username={username} setShowComponent={setShowComponent}/>
            <div id="profile-username">{username}</div>
            <div class="profile-follow-label">Followers:</div>
            <div id="followers-num-${username}" class="profile-follow-num">0</div>
            <div class="profile-follow-label">Followings:</div>
            <div id="followings-num-${username}" class="profile-follow-num">0</div>
        </>
    );
}

export default Profile