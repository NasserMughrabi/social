import React from 'react'

const Post = ({id, username, content, date_posted, likes_num}) => {

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
}

export default Post