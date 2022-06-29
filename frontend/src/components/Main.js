import React from 'react'
import { useState, useEffect, useRef } from 'react';
import Profile from './Profile';

const Main = () => {
    // send http request to the server/database to get the needed data (in this case: all posts)
    const [allposts, setAllPosts] = useState([]);
    const [showProfile, setShowProfile] = useState(false);
    const [profileUsername, setProfileUsername] = useState('');

    useEffect( async () => {
        try{
            const response = await fetch('api/allposts');
            const posts = await response.json();
            setAllPosts(posts);
        } catch(exception) {
            console.log('ERROR! fetching incorrect URL');
        }
        
    }, allposts)

    const handleProfileClick = (username) => {
        setProfileUsername(username)
        setShowProfile(true);
    }

    if(showProfile){
        return <Profile username={profileUsername} />
    }
    return (
        <>
            <div id="new-post">
                <form id="new-post-form">
                    <textarea className="form-control" name="post-content" id="post-content" placeholder="New Post" rows="4"></textarea>
                    <input className="btn btn-primary mb-2" id="post-submit" type="submit" value="Post"></input>
                </form>
            </div>
            {allposts.map(post => {
                const {id, username, content, date_posted, likes_num} = post;
                return (
                    <div key={id} className="post-div">
                        <div className="username" onClick={()=>{handleProfileClick(username)}}>
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
            })}
        </>
    );
}

export default Main