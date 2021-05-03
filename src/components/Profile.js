import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { Avatar } from '@material-ui/core'
import {useHistory} from 'react-router-dom'

import {changeDpAct} from '../actions/auth.js'


const Profile = (props) => {

const theName = props.thisprops.match.params.name
const userData = JSON.parse(localStorage.getItem('profile'))

const dispatch = useDispatch()
const history = useHistory()
const auth = useSelector(state => state.auth)

console.log(theName)
const [showChange, setShowChange] = useState(false)
const [searchBar, setSearchBar] = useState('')
const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))
const [profilePic, setProfilePic] = useState()

const logoutUser = () => {
    history.push('/')
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

const convertFile = (file) => {
return new Promise( (resolve, reject) => {
    const fileReader = new FileReader()

    fileReader.readAsDataURL(file)

    fileReader.onload = () => {
        resolve(fileReader.result)
    }

    fileReader.onerror = error => {
        reject(error)
    }
})
}

const uploadPic = async e => {
const file = e.target.files[0]
const convertedPic = await convertFile(file)
setProfilePic(convertedPic)
}

const changeDp = () => {

const theImage = {
theimg: profilePic
}

dispatch(changeDpAct(theImage))
setShowChange(prev => !prev)
}

const openFileChange = () => {
window.document.getElementById('changedpfile').click()
}

const renderConfirmationBtn = () => (
<div className={showChange ? "show-changeDp" : "close-changeDp" } >
    <div className="btn-changebx">
        <h2 className="show-changeDp-question">confirm profile picture ?</h2>
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px'}}>
            <button className="confirmchange-btn"onClick={() => setShowChange(prev => !prev)}>CANCEL</button>
            <button className="confirmchange-btn"onClick={changeDp}>CONFIRM</button>
        </div>
    </div>
</div>
)

useEffect( () => {
    setUser(JSON.parse(localStorage.getItem('profile')))
}, [auth])


useEffect( () => {
if(!profilePic){
  return console.log('nothing to change')
}else{
    setShowChange(prev => !prev)
    console.log(profilePic)
}
}, [profilePic])

return(
<div className="profile-page">
    <div className="prof-appBar">
        <div className="logo-searchbar">
        <h2 style={{cursor: 'pointer'}}
         onClick={() => history.push('/')}
        className="prof-fakebooklogo">f</h2>
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
    <div className="myprofile-page" style={{marginTop: '-30px'}}>
        <div className="profile-cover-dp">
            <div className="prof-cover">
                <img src="/images/samplecover.jpg" alt="fakebook"
                className="prof-cover-img" />
            </div>
            <div className="prof-dp">
                <div className="dp-btn-merge">
                    <div className="prof-dpbx">
                        {!user.result.profilePic ? 
                        <img src="/images/user.svg" alt="fakebook users"
                        style={{width: '100%', height: '100%'}} /> 
                        :
                        <img src={user?.result?.profilePic} alt={user?.result?.name}
                        style={{width: '100%', height: '100%'}} /> }
                        
                    </div>
                    <div className="changeIconbx" onClick={openFileChange}>
                        <img src="/images/camera.svg" className="change-icon" />
                    </div>
                    {renderConfirmationBtn()}
                    
                    <input type="file" onChange={uploadPic} 
                    className="input-file" id="changedpfile" />
                </div>
            </div>
        </div>
    </div>
</div>
)
}

export default Profile;