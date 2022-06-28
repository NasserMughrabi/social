import React from 'react'
import Post from './Post';
import { useState, useEffect } from 'react';

const Main = () => {
    // send http request to the server/database to get the needed data (in this case: all posts)
    const [allposts, setAllPosts] = useState([]);

    useEffect( async () => {
        try{
            const response = await fetch('api/allposts');
            const posts = await response.json();
            setAllPosts(posts);
        } catch(exception) {
            console.log('ERROR! fetching incorrect URL');
        }
        
    }, allposts)

    return (
        <>
            <div id="new-post">
                <form id="new-post-form">
                    <textarea className="form-control" name="post-content" id="post-content" placeholder="New Post" rows="4"></textarea>
                    <input className="btn btn-primary mb-2" id="post-submit" type="submit" value="Post"></input>
                </form>
            </div>
            {allposts.map(post => {
                return (
                    <Post {...post}/>
                );
            })}
        </>
    );
}

export default Main