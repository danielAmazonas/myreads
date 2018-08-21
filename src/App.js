import React, { Component } from 'react'
import Search from './Search'
import ListBooks from './ListBooks'
import * as BooksAPI from './BooksAPI'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import './App.css'

class App extends Component {
  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.setState({ books })
    })
  }

  onChanged = (book, newShelf) => {
    /*
    this.setState(state => ({
      books: state.books.concat([book])
    }))
    */
    BooksAPI.update(book, newShelf).then(() => {
      this.setState(state => ({
        books: state.books.concat([book])
      }))
    })
  }

  render() {
    const { books } = this.state

    return (
      <div className='app' >
        <Router>
          <div>
            <Route
              exact
              path='/'
              render={({ history }) => (
                <ListBooks
                  currentlyReading={books.filter((book) => book.shelf === 'currentlyReading')}
                  wantToRead={books.filter((book) => book.shelf === 'wantToRead')}
                  read={books.filter((book) => book.shelf === 'read')}
                  onChanged={() => {
                    this.onChanged
                    history.push('/')
                  }}
                />
              )} />
            <Route path='/search' render={() => (
              <Search onChanged={this.onChanged}/>
            )} />
          </div>
        </Router>
      </div>
    )
  }
}

export default App