import React from 'react'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { useState, useEffect } from 'react';

const Profile = ({logUsername, username}) => {
   
    let myProfile = false;
    if(logUsername === username){
        myProfile = true;
    }

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

    // handle likes
    const [allLiked, setAllLiked] = useState([]);
    const [liked, setLiked] = useState(false);
    useEffect(()=>{
        fetch('api/like')
            .then(response => response.json())
            .then(result => setAllLiked(result))
            .catch(err => console.log(err));
    }, [allLiked])

    const handleLike = (id, text) => {
        if(text === 'unlike'){
            // remove from Like table
            fetch('api/remove_like', {
                method: 'POST',
                body: JSON.stringify({
                    post_id: id,
                })
            })
            .then(response => response.json())
            .then(result => setLiked(false))
            .catch(err => console.log(err));
            
        }  else {
            // add to Like table/model
            fetch('api/add_like', {
                method: 'POST',
                body: JSON.stringify({
                    post_id: id,
                })
            })
            .then(response => response.json())
            .then(result => setLiked(true))
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
                {following ? myProfile ? '':<button className="btn btn-primary mb-2" id='following-btn' onClick={handleFollow}>Unfollow</button> :  myProfile ? '':<button className="btn btn-primary mb-2" id='following-btn' onClick={handleFollow}>Follow</button>}
            </div>
            <div id="followings-posts">
                {profilePosts.map(post => {
                    const {id, username, content, date_posted, likes_num} = post;
                    let likedPost = false;
                    for(let i=0; i<allLiked.length; i++){
                        if(allLiked[i].liked_post_id === id && allLiked[i].username === logUsername){
                            likedPost = true;
                            break;
                        }
                    }
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
                                {likedPost ? <div onClick={()=>{handleLike(id, 'unlike')}}><AiFillHeart size={25} color={'red'} /></div>:<div onClick={()=>{handleLike(id, 'like')}}><AiOutlineHeart size={25}/></div> }
                            </div>
                            <div className="likes" >
                                <div>{likes_num}</div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    );
}

export default Profile