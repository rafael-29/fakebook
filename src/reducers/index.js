import {combineReducers} from 'redux'

import auth from './auth.js'
import posts from './posts.js'

export default combineReducers({auth, posts})