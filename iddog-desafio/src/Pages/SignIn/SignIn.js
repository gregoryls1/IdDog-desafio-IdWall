import React, { Component } from 'react'
import Axios from 'axios'
import { Redirect } from 'react-router-dom'

import './SignIn.css'
import Title from '../Title/Title'


class SignIn extends Component {
  state = {
    email: '',
    toFeed: false
  }

  handleChange = (event) => {
    this.setState({
      email: event.target.value
    });
  }

  componentDidMount() {
    const token = localStorage.getItem('token')

    if(token) {
      this.setState({
        toFeed: true
      })
    }

  }

  handleSubmit = (event) => {
    event.preventDefault();
    
    Axios({
      method: 'post',
      url: 'https://api-iddog.idwall.co/signup',
      data: '',
      headers: {
        'Content-Type': 'application/json'
      },
      params: {
        email: this.state.email
      }
    }).then((result) => {

      localStorage.setItem('token', result.data.user.token)
      this.setState({
        toFeed: true
      })

    })
  }

  render() {

    if (this.state.toFeed === true) {
      return <Redirect to='/feed' />
    }
    
        return (
          <div className="signin">
            <div className="signin_wrapper">
              <Title/>
              <form id="signin" onSubmit={this.handleSubmit}>

                {this.state.error && <p>{this.state.error}</p>}

                <input  type="text" placeholder="Seu E-mail"
                   value={this.state.email} onChange={this.handleChange}/> 

               <button type="submit">Entrar</button>

              </form>
            </div>
          </div>
        )
      }
    }


export default SignIn