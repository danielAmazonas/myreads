import React, { Component } from 'react'
import Search from './Search'
import Shelf from './Shelf'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import './App.css'
import PropTypes from 'prop-types'

class App extends Component {
  render() {
    return (
      <div className="app">
        <Router>
          <div>
            <Route exact path="/" render={() => (
              <div className="list-books">
                <div className="list-books-title">
                  <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                  <div>
                    <Shelf currentlyReading={() => ({})} />
                    {/*<Shelf wantToRead={() => ({})} />
                    <Shelf read={() => ({})} />*/}
                  </div>
                </div>
                <div className="open-search">
                  <Link to='/search'>Add a book</Link>
                </div>
              </div>
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