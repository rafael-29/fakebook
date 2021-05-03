import axios from 'axios'

const API = axios.create({
baseURL: 'https://rafafakebook.herokuapp.com'
})
API.interceptors.request.use( (req) => {
req.headers.authorization = `bearer ${JSON.parse(localStorage.getItem('profile'))?.token}`
return req
})



//make new post
export const createPost = (postData) => API.post('/fakeposts', postData);

//fetch posts
export const getPosts = () => API.get('/fakeposts');

// LIKE A POST 
export const likePost = (postid) => API.patch(`/fakeposts/like/${postid}`);


// CHANGE DP OF USER
export const changedp = (theData) => API.patch(`/fakebookusers/changedp`, theData);

// SIGNUP NEW USER
export const createNewUser = (infoForSend) => axios.post('https://rafafakebook.herokuapp.com/fakebookusers', infoForSend);

//login user
export const loginAuth = (loginData) => axios.post('https://rafafakebook.herokuapp.com/fakebookusers/auth', loginData);
