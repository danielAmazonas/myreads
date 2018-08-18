import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as BooksAPI from './BooksAPI'

class Book extends Component {
    static propTypes = {
        shelf: PropTypes.array.isRequired
    }

    state = {
        books: []
    }

    componentDidMount() {
        BooksAPI.getAll().then((books) => {
            this.setState({ books })
        })
    }

    render() {
        const { books } = this.state
        const { shelf } = this.props
        
        return (
            <ol className="books-grid">
                {books.filter((book) => shelf.map((c) => c.id).includes(book.id)).map((book) => (
                    <li key={book.id}>
                        <div className="book">
                            <div className="book-top">
                                <div
                                    className="book-cover"
                                    style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.smallThumbnail})` }}></div>
                                <div className="book-shelf-changer">
                                    <select>
                                        <option value="move" disabled>Move to...</option>
                                        <option value="currentlyReading">Currently Reading</option>
                                        <option value="wantToRead">Want to Read</option>
                                        <option value="read">Read</option>
                                        <option value="none">None</option>
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
        )
    }
}

export default Book