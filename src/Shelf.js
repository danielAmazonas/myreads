import React, { Component } from 'react'
import Book from './Book'
import PropTypes from 'prop-types'
import * as BooksAPI from './BooksAPI'

class Shelf extends Component {
    static propTypes = {
        shelf: PropTypes.string.isRequired,
        books: PropTypes.array.isRequired,
        onChanged: PropTypes.func.isRequired
    }

    changeShelf = (book, newShelf) => {
        BooksAPI.update(book, newShelf)
    }

    render() {
        const { shelf, books } = this.props

        let listBook

        return (
            <div>
                <div className='bookshelf'>
                    <h2 className='bookshelf-title'>
                        {shelf} - <span>Amt </span>{books.length}
                    </h2>
                    <div className='bookshelf-books'>
                        <ol className='books-grid'>
                            {books.length === 0 ?
                                listBook = (
                                    <li key='0'>
                                        <p>No Books</p>
                                    </li>) :
                                listBook = books.map((book) =>
                                    <li key={book.id}>
                                        <Book
                                            book={book}
                                            onChanged={this.changeShelf} />
                                    </li>)}
                        </ol>
                    </div>
                </div>
            </div>
        )
    }
}

export default Shelf