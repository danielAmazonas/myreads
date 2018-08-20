import React, { Component } from 'react'
import Search from './Search'
import ListBooks from './ListBooks'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import './App.css'

class App extends Component {
  render() {
    return (
      <div className="app">
        <Router>
          <div>
            <Route exact path="/" render={() => (
              <ListBooks />
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