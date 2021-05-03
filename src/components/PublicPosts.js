import React,{useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import Skeleton from '@material-ui/lab/Skeleton';
import {Avatar} from '@material-ui/core'

import axios from 'axios'

import {getPostAct, likePostAct} from '../actions/posts.js'


const PublicPosts = ({user}) => {

const dispatch = useDispatch()
const posts = useSelector(state => state.posts);


const [usersData, setUsersData] = useState();

const renderRealAvatar = (post) => {

const found = usersData.find(user => user._id === post.creator)
if(found === undefined){
    <Avatar src={post.creatorImg} alt={post.name}>{post.name.charAt(0)}</Avatar>
}else{
    return <Avatar src={found.profilePic} alt={found.name}>{found.name.charAt(0)}</Avatar>
}



}

const renderPostHeading = (post) => {

return (
<div className="post-heading">
<div style={{display: 'flex', justifyContent: 'flex-start', alignItems: 'center', gap: '11px'}}>
{
usersData === undefined ? (<Avatar src={post.creatorImg} alt={post.name}>{post.name.charAt(0)}</Avatar>) : 
(renderRealAvatar(post))
}

<h5 className="caption">{post.name}</h5>
</div>
<i class="fas fa-ellipsis-h"></i>
</div> 
)

}

const getUsers = async () => {
    const results = await axios.get('https://rafafakebook.herokuapp.com/fakebookusers')
    setUsersData(results.data)
}
const likeFunc = post => {
dispatch(likePostAct(post._id))
}

const renderlikeBtn = post => {
    
    
    const isThere = post.likes.some(pId => pId === user?.result?._id)

    if(isThere){
        return <button onClick={() => likeFunc(post)}
        className="posts-btn like-blue">Like</button>
    }else{
        return <button onClick={() => likeFunc(post)}
        className="posts-btn">Like</button>
    }
}

const renderLikes = (post) => (

<div className="like-comment-share">
    {renderlikeBtn(post)}
    <button className="posts-btn">Comment</button>
    <button className="posts-btn">Share</button>
</div>

)



useEffect( () => {
dispatch(getPostAct())
getUsers()
}, [dispatch])

return(
<div>{!posts.length || user === null ? (
<div>
    <Skeleton variant="text" />
    <Skeleton variant="circle" width={40} height={40} />
    <Skeleton variant="rect" width={210} height={118} />
</div>
): (
<div className="posts-container">
    {posts.map(post => (
        <div className="posts-box" key={post._id}>

            {renderPostHeading(post)}

            <h3 className="posts-title">{post.title}</h3>
            
            <img src={post.selectedImage} alt={post.title}
            style={{width: '100%', marginBottom: '5px'}} />


            <div className="likes-length" style={{marginBottom: '8px'}}>
            <img src="/images/like.svg" alt="fakebook likes" width="24" />
            <span className="likelength">{post.likes.length}</span>
            </div>

            <div className="likes-length" >
                <div className="post-border"></div>
            </div>

            {renderLikes(post)}

        </div>
    ))}
</div>
)
}</div>

)
}

export default PublicPosts;