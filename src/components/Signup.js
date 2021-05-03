import { TextField, Typography, Grid, Paper, Button } from '@material-ui/core'
import React, {useState} from 'react'
import axios from 'axios'
import {useDispatch} from 'react-redux'

import {signupAction} from '../actions/auth.js'

const Signup = ({setSignUpForm}) => {

const dispatch = useDispatch()

const month = ['january', 'february', 'march']

const day = ['1', '2', '3']

const year = ['1990', '1991', '1993']

const [selectedMonth, setSelectedMonth] = useState('january')
const [selectedDay, setSelectedDay] = useState('1')
const [selectedYear, setSelectedYear] = useState('1990')

const [userData, setUserData] = useState({
firstname: '', lastname: '', email: '', password: '',
birthday: '', forDp: ''
})

const closeSignUpForm = () => {
    setSignUpForm(prev => !prev)
}

const registerAcc = () => {
const infoForSend = {
name: `${userData.firstname} ${userData.lastname}`,
email: userData.email,
password: userData.password,
profilePic: userData.forDp,
birthday: `${selectedMonth} ${selectedDay}`,
}
dispatch(signupAction(infoForSend))

}
const userHandleChange = e => {
const {name, value} = e.target;

setUserData({...userData, [name]: value})
}

const convertFile = file => {
    return new Promise ( (resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file)

        fileReader.onload = () => {
            resolve(fileReader.result)
        }
        fileReader.onerror = error => {
            reject(error)
        }
    })
}

const uploadImg = async (e) => {
const file = e.target.files[0];
const converted = await convertFile(file)

setUserData({...userData, forDp: converted})
}

return(
<Paper style={{
    padding: '10px 23px',
    position: 'relative',
    width: window.innerWidth < 700 ? '100%' : window.innerWidth < 900 ? '60%' : '47%'
}}>
    <Grid container justify="space-between" alignItems="center">
        <Grid item>
        <Typography color="textPrimary" variant="h4">Sign up</Typography>
        </Grid>
        <Grid item>
        <button onClick={closeSignUpForm}
        style={{fontSize: '1.4rem', padding: '0',
        border: 'none',
        background: 'none',
        cursor: 'pointer'}}>X</button>
        </Grid>
    </Grid>

    <Typography style={{marginBottom: '5px'}} color="textSecondary" variant="h6">It's quick and easy.</Typography>
    <hr />
    <br />
    <Grid container justify="space-between" alignItems="flex-start">
        <Grid item style={{width: '49%'}}>
            <TextField value={userData.firstname} name="firstname" onChange={userHandleChange}
            variant="outlined" size="small" label="firstname" style={{width: '100%', marginBottom: '8px'}}/>
        </Grid>
        <Grid item style={{width: '50%'}}>
            <TextField value={userData.lastname} name="lastname" onChange={userHandleChange}
            variant="outlined" size="small" label="lastname" style={{width: '100%', marginBottom: '8px'}}/>
        </Grid>
    </Grid>
    <TextField value={userData.email} name="email" type="email" onChange={userHandleChange}
     style={{marginBottom: '8px'}} variant="outlined" size="small" label="Your Email" fullWidth/>
    <TextField value={userData.password} name="password" type="password" onChange={userHandleChange}
     style={{marginBottom: '8px'}} variant="outlined" size="small" label="Password" fullWidth />
    <Typography color="textSecondary">Birthday</Typography>
    <Grid container>

        <Grid item style={{width: '34%'}}>
        <select value={selectedMonth} style={{width: '99%', cursor: 'pointer', border: '1px solid gray', outline: 'none', padding: '5px 10px', fontSize: '1.2rem', color: 'gray'}}
        onChange={e => setSelectedMonth(e.target.value)}>{
        month.map((mont, idx) => (
            <option style={{cursor: 'pointer'}} key={idx}
            value={mont}>{mont}</option>
        ))
        }</select > 
        </Grid>

        <Grid item style={{width: '33%'}}>
        <select value={selectedDay} style={{width: '99%', cursor: 'pointer', border: '1px solid gray', outline: 'none', padding: '5px 10px', fontSize: '1.2rem', color: 'gray'}}
        onChange={e => setSelectedDay(e.target.value)}>{
        day.map((mont, idx) => (
            <option style={{cursor: 'pointer'}} key={idx}
            value={mont}>{mont}</option>
        ))
        }</select > 
        </Grid>

        <Grid item style={{width: '33%', marginBottom: '12px            '}}>
        <select value={selectedYear} style={{width: '99%', cursor: 'pointer', border: '1px solid gray', outline: 'none', padding: '5px 10px', fontSize: '1.2rem', color: 'gray'}}
        onChange={e => setSelectedYear(e.target.value)}>{
        year.map((mont, idx) => (
            <option style={{cursor: 'pointer'}} key={idx}
            value={mont}>{mont}</option>
        ))
        }</select > 
        </Grid>

    </Grid>
    <Typography color="textSecondary">By clicking Sign Up, you agree to our Terms, Data Policy and Cookies Policy. You may receive SMS Notifications from us and can opt out any time.</Typography>
    <br />
    <input type="file" onChange={uploadImg} />
    <div style={{textAlign: 'center', marginBottom: '7%'}}>
    <Button onClick={registerAcc}
    style={{background: '#00a400',
    width: '200px',
    color: 'white',
    cursor: 'pointer'}}
    >Sign Up</Button>
    </div>
</Paper>
)
}

export default Signup