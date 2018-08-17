import React, { Component } from 'react'
import Search from './Search'
import Book from './Book'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './App.css'
import PropTypes from 'prop-types'

class App extends Component {
  render() {
    return (
      <div className="app">
        <Router>
          <div>
            <Route exact path="/" render={() => (
              <Book />
            )} />
            <Route path="/search" render={() => (
              <Search />
            )} />
          </div>
        </Router>
      </div>
    )
  }
}

export default App