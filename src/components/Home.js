import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { Avatar, Button, Container, Grid, Paper, TextField, Typography} from '@material-ui/core'
import {useHistory, Link} from 'react-router-dom'
//actions
import {authAction} from '../actions/auth.js';
import {createPostAct} from '../actions/posts.js'

import Signup from './Signup'
import PublicPosts from './PublicPosts'

const Home = () => {

const dispatch = useDispatch()
const history = useHistory()
const auth = useSelector(state => state.auth)

const [errMessage, setErrMessage] = useState()
const [signUpForm, setSignUpForm] = useState(false)
const [postOpen, setPostOpen] = useState(false)
const [searchBar, setSearchBar] = useState('')
const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))
const [loginData, setLoginData] = useState({
email: '', password: ''
})

const [postData, setPostData] = useState({
title: '', selectedImg: ''
})


const openSignUp = () => {
    setSignUpForm(prev => !prev)
}

const handleChange = e => {
const {name, value} = e.target;
setLoginData({...loginData, [name]: value})
}

const submitLoginForm = () => {
dispatch(authAction(loginData, history, setErrMessage))
setLoginData({
    email: '', password: ''
    })
}
const logoutUser = () => {
    dispatch({type: 'LOGOUT'})
}

const changeSearch = e => {
setSearchBar(e.target.value)
}

const searchName = (e) => {

if(e.key === 'Enter'){
    console.log(searchBar)
}

}

const goToProfile = () => {
history.push(`/${user.result.name}`)
}

// adding image
const addImgFile = (e) => {
window.document.getElementById('forImg').click()
}

const convertFile = (file) => {
return new Promise( (resolve, reject) => {
    const fileReader = new FileReader()

    fileReader.readAsDataURL(file)

    fileReader.onload = () => {
        resolve(fileReader.result)
    }

    fileReader.onerror = (error) => {
        reject(error)
    }
})
}

const uploadImage = async e => {
const file = e.target.files[0]

const convertedImg = await convertFile(file)

setPostData({...postData, selectedImg: convertedImg})

}
// CREATING POST 
const submitPostData = () => {
const origPostData = {
creator: user.result._id,
name: user.result.name,
title: postData.title,
selectedImage: postData.selectedImg,
creatorImg: user.result.profilePic
}

dispatch(createPostAct(origPostData))

setPostOpen(prev => !prev)
}

useEffect( () => {
    setUser(JSON.parse(localStorage.getItem('profile')))

}, [auth])

if(user === null){
    return(
        <Container style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        }}>
        <Grid container justify="space-around" alignItems="center"  spacing={4}>
            <Grid item style={{marginBottom: '7%'}}>
                <h1 className="logoname">fakebook</h1>
                <Typography
                 variant={window.innerWidth < 800 ? "h6" : "h4"} color="textPrimary">Connect with friends and the world <br />
                 around you on Fakebook.</Typography>
            </Grid>
            <Grid item className="home-login" sm={5}>
                <Paper style={{
                padding: '30px'
                }}>
                {!errMessage ? <></> : <Typography align="center" color="secondary">{errMessage}</Typography>}
                <TextField name="email" value={loginData.email} onChange={handleChange}
                style={{marginBottom: '20px'}} fullWidth label="Enter Email" />
                <TextField name="password" value={loginData.password} onChange={handleChange}
                style={{marginBottom: '20px'}} fullWidth label="Password" />
                <Button onClick={submitLoginForm}
                style={{marginBottom: '15px'}} variant="contained" color="primary" fullWidth>Login</Button>
                <Button style={{marginBottom: '5px'}} color="primary" fullWidth>Forgot password?</Button>
                <hr />
                <br />
                <Button onClick={openSignUp} style={{
                background: '#00a400',
                color: 'white'
                }} fullWidth>Create New Account</Button>
        
                </Paper>
            </Grid>
        </Grid>
        <Container style={{
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        background: '#f5f5f5',
        zIndex: '2',
        display: !signUpForm ? 'none' : 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        }}>
        <Signup setSignUpForm={setSignUpForm}/>
        </Container>
        
        </Container>
        )   
}else{
    return(
    <div className="profile-page">
        <div className={postOpen ? 'open-postbx' : 'close-postbx'}>
            <div className="open-post">
                <div className="headings-createpost">
                    <div></div>
                    <h2 className="create-post" variant="h6">Create Post</h2>
                    <i onClick={() => setPostOpen(prev => !prev)}
                    class="far fa-times-circle"></i>
                </div>
                <textarea className="posting-textarea" value={postData.title}
                onChange={e => setPostData({...postData, title: e.target.value})}
                placeholder={`What's on your mind, ${user.result.name} ?`} />
                <div className="addtoyour-post">

                    <h4 className="caption">Add to Your Post</h4>

                    <div className="toaddposts">
                        <img onClick={addImgFile}
                        src="/images/folder.svg" className="post-imgs" />
                        <img src="/images/tag.svg" className="post-imgs" />
                        <img src="/images/happy.svg" className="post-imgs" />
                        <img src="/images/chat.svg" className="post-imgs" />
                        <i class="fas fa-ellipsis-h"></i>
                    </div>
                    
                </div>
                <button onClick={submitPostData}
                className="create-post-btn">Post</button>
            </div>
        </div>
    <div className="prof-appBar">
        <div className="logo-searchbar">
        <h2 style={{cursor: 'pointer'}}
         onClick={() => history.push('/')} className="prof-fakebooklogo">f</h2>
        <input type="text" name="searchbar" placeholder="search fakebook" 
        value={searchBar} onChange={changeSearch} className="appbar-srchbtn"
        onKeyPress={searchName} />
        </div>
        <div className="prof-rightBar">
            <div className="profilepicbx">
                <Avatar src={user.result.profilePic} alt={user.result.name}
                className="prof-pic-circle" >{user.result.name.charAt(0)}</Avatar>
                <p onClick={goToProfile} className="profile-names">{user.result.name}</p>
            </div>
            <p className="profile-names" onClick={logoutUser}>Log out</p>
        </div>
    </div>
    <div className="timeline">
        <div className="left-timeline">
            <div className="pic-and-name">
            <Avatar src={user.result.profilePic} alt={user.result.name}
            className="post-img" >{user.result.name.charAt(0)} </Avatar>
            <p className="profile-names">{user.result.name}</p>
            </div>
        </div>
        <div className="center-timeline">
            <div className="post-here">
                <div className="post-img-post-btn">
                    <Avatar src={user.result.profilePic} alt={user.result.name}
                    className="post-img" >{user.result.name.charAt(0)}</Avatar>
                    <button onClick={() => setPostOpen(prev => !prev)}
                    className="appbar-srchbtn">
                    What's on your mind {user.result.name} ?
                    </button>
                </div>
                <div className="post-activities">
                    <button className="activites-btn" onClick={addImgFile}>
                    <i className="far fa-images"></i> Photo/Video

                    </button>
                </div>
            </div>
            <div className="timeline-posts">
                <PublicPosts />
            </div>
        </div>
        <div className="right-timeline">
            <div className="fake-requestbx">
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <h4 className="timeline-headers-small">Fake Requests</h4>
                <div className="see-all">See All</div>
                </div>
            </div>
        </div>
    </div>
<input id="forImg" type="file"
onChange={uploadImage} className="input-image" />
</div>
    )
     
}


}
export default Home;