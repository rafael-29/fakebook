import React,{useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import Skeleton from '@material-ui/lab/Skeleton';
import {Avatar, Typography} from '@material-ui/core'

import axios from 'axios'

import {getPostAct, likePostAct} from '../actions/posts.js'


const PublicPosts = ({user}) => {

const dispatch = useDispatch()
const posts = useSelector(state => state.posts);


const [usersData, setUsersData] = useState();
const [commentOpen, setCommentOpen] = useState(false)

const renderRealAvatar = (post) => {

const found = usersData.find(theuserm => theuserm._id === post.creator)
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
<i className="fas fa-ellipsis-h"></i>
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
    <button onClick={() => setCommentOpen(prev => !prev)}
     className="posts-btn">Comment</button>
    <button className="posts-btn">Share</button>
</div>

)

const renderComments = pozt => {

    return pozt.commentos.map(koment => (
        <div className={commentOpen ? "koment-bx" : "hiddenbx"} key={koment._id}>
            <div className="koment-litbx">
                <div className="koment-name">{koment.name}</div>
                <div className="koment-name">{koment.comment}</div>
            </div>
            <div className="koment-clicks">
                <div className="kom-btn">Like {koment.likes.length}</div>
                <div className="kom-btn">reply</div>
            </div>
        </div>
    ))
}


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
            <div className={commentOpen ? "comment-bx" : "hiddenbx"}>
                <input type="text" className="comment-input" placeholder="write a comment"
onKeyPress={async e => {

const datako = {
    name: user.result.name,
    commentorUserId: user.result._id,
    comment: e.target.value
}

if(e.key === 'Enter'){
await axios.patch(`http://localhost:8080/fakeposts/addcomment/${post._id}`, datako)

dispatch(getPostAct())
e.target.value = ""
}
}} />
            
            </div>
            <div style={{display: 'flex',
        flexDirection: 'column-reverse'}}>
            {renderComments(post)}
            </div>
        </div>
    ))}
</div>
)
}</div>

)
}

export default PublicPosts;