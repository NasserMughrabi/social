import React from 'react'
import { useState, useEffect, useRef } from 'react';
import CSRFToken from './CSRFToken';

const Followings = ({logUsername, setShowComponent, setUsername}) => {

  const [followingsPosts, setFollowingsPosts] = useState([]);
  useEffect(() => {
        fetch('api/followingsposts')
        .then(response => response.json())
        .then(posts => {setFollowingsPosts(posts);})
        .catch(err => console.log(err));
  }, [followingsPosts])

  const handleProfileClick = (username) => {
      setUsername(username);
      setShowComponent('Profile');
  }

  const contentEl = useRef(null);
  const handleSubmit = (e) => {
      e.preventDefault();
      fetch('api/new_post', {
          method: 'POST',
          body: JSON.stringify({
              content: contentEl.current.value  
          })
      })
      .then(response => response.json())
      .then(result => console.log(result))
      .catch(err => console.log(err));
      setShowComponent('Followings');
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
      <div id="new-post">
        <form id="new-post-form" onSubmit={handleSubmit}>
            <CSRFToken />
            <textarea ref={contentEl} className="form-control" name="post-content" id="post-content" placeholder="New Post" rows="4"></textarea>
            <input className="btn btn-primary mb-2" id="post-submit" type="submit" value="Post"></input>
        </form>
      </div>
      <div id="followings-posts">
        {
          followingsPosts.map(post => {
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
                    {likedPost ? <button onClick={()=>{handleLike(id, 'unlike')}}>Unlike</button>:<button onClick={()=>{handleLike(id, 'like')}}>Like</button> }
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

export default Followings