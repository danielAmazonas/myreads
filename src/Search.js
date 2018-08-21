import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import PropTypes from 'prop-types'

class Search extends Component {
    state = {
        showingBooks: []
    }

    static propTypes = {

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
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to="/" className="close-search">Close</Link>
                    <div className="search-books-input-wrapper">
                        <input
                            type="text"
                            placeholder="Search by title or author"
                            value={query}
                            onChange={(event) => this.updateQuery(event.target.value)}
                        />
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {showingBooks.map((book) => (
                            <li key={book.id}>
                                <div className="book">
                                    <div className="book-top">
                                        <div
                                            className="book-cover"
                                            style={{
                                                width: 128,
                                                height: 193,
                                                backgroundImage: `url(${book.hasOwnProperty('imageLinks') ?
                                                    book.imageLinks.smallThumbnail :
                                                    ''})`
                                            }}></div>
                                        <div className="book-shelf-changer">
                                            <select>
                                                <option
                                                    value="move"
                                                    disabled>Move to...</option>
                                                <option
                                                    value="currentlyReading">Currently Reading</option>
                                                <option
                                                    value="wantToRead">Want to Read</option>
                                                <option
                                                    value="read">Read</option>
                                                <option
                                                    value="none">None</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="book-title">
                                        {book.title}
                                    </div>
                                    {book.authors ? book.authors.map((author) =>
                                        <div key={`${author}-${book.id}`} className="book-authors">
                                            {author}
                                        </div>
                                    ) : ''}
                                </div>
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        )
    }
}

export default Search