import * as api from '../api'


export const authAction = (loginData, history, setErrMessage) => async (dispatch) => {

try {
    const { data } = await api.loginAuth(loginData)
    if(data === 'no user with this email'){
        return setErrMessage('Invalid Username')
    }
    dispatch({type: 'AUTH', payload: data})
    history.push('/')
} catch (error) {
    console.log(error)
}
}

export const signupAction = (infoForSend) => async (dispatch) => {
    try {
        const { data } = await api.createNewUser(infoForSend)

        dispatch({type: 'AUTH', payload: data})
    } catch (error) {
        console.log(error)
    }
}

export const changeDpAct = (theData) => async (dispatch) => {

try {
    const { data } = await api.changedp(theData)

    dispatch({type: 'CHANGEDP', payload: data})

} catch (error) {
    return console.log(error)
}
}