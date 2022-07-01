import React from 'react'
import { useState, useEffect } from 'react';

const Profile = ({username}) => {

    const [profile, setProfile] = useState(false);
    useEffect(() => {
            fetch('api/profile', {
                method: 'POST',
                body: JSON.stringify({
                    username: username,
                })
            })
            .then(response => response.json())
            .then(profile => {setProfile(profile)});
    }, [profile])

    const [profilePosts, setProfilePosts] = useState([]);
    useEffect(() => {
            fetch('api/profileposts', {
                method: 'POST',
                body: JSON.stringify({
                    username: username,
                })
            })
            .then(response => response.json())
            .then(posts => {setProfilePosts(posts);})
            .catch(err => console.log(err));
    }, [profilePosts])

    const [following, setFollowing] = useState(false);
    useEffect(()=>{
        fetch('api/follow', {
                method: 'POST',
                body: JSON.stringify({
                    username: username,
                })
            })
            .then(response => response.json())
            .then(result => setFollowing(result))
            .catch(err => console.log(err));
    }, [following])


    const handleFollow = () => {
        if(following){
            // decrease followers number for the user followed
            // decrease followings number for the request.user
            // remove both users to Following table
            console.log('remove')
            fetch('api/remove_following', {
                method: 'POST',
                body: JSON.stringify({
                    username: username,
                })
            })
            .then(response => response.json())
            .then(result => setFollowing(false))
            .catch(err => console.log(err));
            
        }  else {
            // increase followers number for the user followed
            // increase followings number for the request.user
            // add both users to Following table
            console.log('add')
            fetch('api/add_following', {
                method: 'POST',
                body: JSON.stringify({
                    username: username,
                })
            })
            .then(response => response.json())
            .then(result => setFollowing(true))
            .catch(err => console.log(err));
        }
        
    }

    return (
        <>
            <div key={profile.id} id="profile">
                <div id="profile-username">{username}</div>
                <div class="profile-follow-label">Followers:</div>
                <div id="followers-num-${username}" class="profile-follow-num">{profile.followers_num}</div>
                <div class="profile-follow-label">Followings:</div>
                <div id="followings-num-${username}" class="profile-follow-num">{profile.following_num}</div>
                {following ? <button onClick={handleFollow}>Unfollow</button> : <button onClick={handleFollow}>Follow</button>}
            </div>
            <div id="followings-posts">
                {
                profilePosts.map(post => {
                    const {id, username, content, date_posted, likes_num} = post;
                    return (
                        <div key={id} className="post-div">
                            <div className="username">
                                {username}
                            </div> 
                            <div className="content"> 
                                {content} 
                            </div>
                            <div className="date"> 
                                {date_posted}  
                            </div>
                            <div className="like">
                                <button>Like</button>
                            </div>
                            <div className="likes" >
                                <div>{likes_num}</div>
                            </div>
                        </div>
                    );
                })
                }
            </div>
        </>
    );
}

export default Profile