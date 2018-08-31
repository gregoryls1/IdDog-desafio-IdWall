import React, { Component } from 'react'

import SignIn from './Pages/SignIn/SignIn'
import Feed from './Pages/Feed/Feed'

import { BrowserRouter } from 'react-router-dom'
import { Route } from 'react-router-dom'

class Routes extends Component {
  state = {}

  render() {    
    return (
      <BrowserRouter>
        <div>
            <Route path="/signin" exact component={ SignIn } />
            <Route path="/feed" exact component={ Feed } />
        </div>
      </BrowserRouter>
    )
  }
}

export default Routes 