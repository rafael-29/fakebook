export default (auth = { authId: null}, action) => {
switch(action.type){
    case 'AUTH':
        localStorage.setItem('profile', JSON.stringify({...action?.payload}))
        return {...auth, authId: JSON.parse(localStorage.getItem('profile')).result._id}
    case 'LOGOUT':
        localStorage.removeItem('profile')
        return {...auth, authId: null}
    case 'CHANGEDP':
        localStorage.setItem('profile', JSON.stringify(action.payload))
        console.log(localStorage.getItem('profile'))
        return {...auth, authId: JSON.parse(localStorage.getItem('profile')).result._id};
    default:
        return auth;
}
}