import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Book from './Book'
import PropTypes from 'prop-types'

class Search extends Component {
    state = {
        showingBooks: []
    }

    static propTypes = {
        onChanged: PropTypes.func.isRequired
    }

    changeShelf = (book, newShelf) => {
        this.props.onChanged(book, newShelf)
    }

    updateQuery = (query) => {
        this.setState({ query: query.trim() })
        if (query === '') {
            this.clearShowingBooks
        }
        this.search(query)
    }

    search = (query) => {
        BooksAPI.search(query).then((showingBooks) => {
            if (showingBooks === undefined)
                return this.clearShowingBooks
            if (showingBooks.hasOwnProperty('error'))
                return this.clearShowingBooks
            this.setState({ showingBooks })
        })
    }

    clearShowingBooks = () => {
        this.setState({ showingBooks: [] })
    }

    render() {
        const { showingBooks, query } = this.state

        return (
            <div className='search-books'>
                <div className='search-books-bar'>
                    <Link to='/' className='close-search'>Close</Link>
                    <div className='search-books-input-wrapper'>
                        <input
                            type='text'
                            placeholder='Search by title or author'
                            value={query}
                            onChange={(event) => this.updateQuery(event.target.value)}
                        />
                    </div>
                </div>
                <div className='search-books-results'>
                    <ol className='books-grid'>
                        {showingBooks.map((book) => (
                            <li key={book.id}>
                                <Book book={book} onChanged={this.changeShelf} />
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        )
    }
}

export default Search