import React, { Component } from 'react'
import { Link, NavLink, Redirect } from 'react-router-dom'
import Axios from 'axios'

import './Feed.css'

import Logo from '../Title/Title' 

class Feed extends Component {
  state = {
    hasToken: true,
    token: '',
    breeds: ['husky', 'labrador', 'hound', 'pug'],
    dogs: {
      husky: [],
      labrador: [],
      hound: [],
      pug: []
    }
  }

  getParams = (name, target) => {
    var match = RegExp('[?&]' + name + '=([^&]*)').exec(target)
    if (match) {
      return match && decodeURIComponent(match[1].replace(/\+/g, ' ')) 
    } else {
      return 'husky'
    }
  }

  getData = (token) => {
    const category = this.getParams('category', window.location.search)
    const cachedCategory = this.state.dogs[category].length

    if (cachedCategory === 0) {
      Axios({
        method: 'get',
        url: 'https://api-iddog.idwall.co/feed',
        data: '',
        headers: {
          'Authorization': token,
          'Content-Type': 'application/json; charset=utf-8',
        },
        params: {
          category
        }
      }).then((result) => {
        //localStorage.setItem(category, JSON.stringify(result.data.list))
        var dogs = {...this.state.dogs}
        dogs[category] = [...result.data.list]

        this.setState({
          dogs
        })
      })
    } 
  }

  linkTarget = (index) => {
    const category = this.getParams('category', window.location.search)
    const imageId = this.getParams('id', window.location.search)
    if (imageId == index) {
      return `?category=${ category }`
    } else {
      return `?category=${ category }&id=${ index }`
    }
  }

  componentDidMount() {
    const token = localStorage.getItem('token')

    if(!token) {
      this.setState({
        hasToken: false,
        token: ''
      })
    } else {
      this.setState({
        hasToken: true,
        token: token
      })
      this.getData(token)
    }
  }

  componentWillUpdate = (nextState) => {
    nextState.location.search !== this.props.location.search ? this.getData(this.state.token) : null
  }

  render() {

    if (this.state.hasToken === false) {
      return <Redirect to='/' />
    }

    return (
      <div className="container feed">
        <div className="feed_wrapper">
          <Logo />
          <nav className="feed_menu">
            { 
              this.state.breeds.map((breed, index) => {

                return <NavLink 
                  key={index} 
                  className={this.props.location.search === '?category='+breed ? 'reallyActive': null} 
                  to={{ pathname: '/feed', search: '?category='+breed }}> 
                    {breed} 
                  </NavLink>
                  
              })
            }
          </nav>

          <div className="feed_results">
            { 
              this.state.dogs[ this.getParams('category', window.location.search) ].map((dog, index) => {

                return <div className="feed_result" key={index}>
                    <Link 
                      to={{ pathname: '/feed', search: `${this.linkTarget(index)}` }}
                      className={ this.getParams('id', window.location.search) == index ? 'enlarge' : ''}>
                        <img className="dogs-img" src={dog} alt="" />
                    </Link>
                  </div> 

              })
            }
          </div>
        </div>
      </div>
    )
  }
}

export default Feed