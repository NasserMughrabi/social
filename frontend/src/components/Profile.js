import React from 'react'

const Profile = ({username}) => {

    // fetch users data
    // fetch users posts
    // display them as html

    return (
        <>
            <div id="profile-username">{username}</div>
            <div class="profile-follow-label">Followers:</div>
            <div id="followers-num-${username}" class="profile-follow-num">0</div>
            <div class="profile-follow-label">Followings:</div>
            <div id="followings-num-${username}" class="profile-follow-num">0</div>
        </>
    );
}

export default Profile