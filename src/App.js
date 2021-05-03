import React from 'react'
import {BrowserRouter, Route} from 'react-router-dom'

import Home from './components/Home';
import Profile from './components/Profile'

import './styles/styles.css'

const App = () => {

const renderProfile = (props) => (
<Profile thisprops={props} />
)


return(
<BrowserRouter>


<Route path="/" exact component={Home} />
<Route path="/:name" render={renderProfile} />

</BrowserRouter>
)
}

export default App;