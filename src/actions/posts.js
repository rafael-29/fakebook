import * as api from '../api'

export const createPostAct = (postData) => async (dispatch) => {
    try {
        const {data} = await api.createPost(postData)

        dispatch({type: 'CREATE', payload: data})
    } catch (error) {
        console.log(error)
    }
}

export const getPostAct = () => async (dispatch) => {
    try {
        const {data} = await api.getPosts()
        
        dispatch({type: 'FETCH', payload: data})
    } catch (error) {
        console.log(error)
    }
}

export const likePostAct = (postid) => async (dispatch) => {
    try {
        const { data } = await api.likePost(postid)
        
        dispatch({type: 'LIKEPOST', payload: data})
    } catch (error) {
        console.log(error)
    }
}