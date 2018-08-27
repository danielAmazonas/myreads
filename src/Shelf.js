import React, { Component } from 'react'
import Book from './Book'
import PropTypes from 'prop-types'
import minibook from './icons/minibook.png'

class Shelf extends Component {
    static propTypes = {
        shelf: PropTypes.string.isRequired,
        books: PropTypes.array.isRequired,
        onChanged: PropTypes.func.isRequired
    }

    /**
     * @description Função de mudança de prateleira
     */
    changeShelf = (book, newShelf) => {
        this.props.onChanged(book, newShelf)
        //BooksAPI.update(book, newShelf) <- Aqui estava o erro (¬¬)
    }

    render() {
        //Desestruturação de objetos
        const { shelf, books } = this.props

        //Lista para montar as prateleiras
        let listBook

        return (
            <div>
                <div className='bookshelf'>
                    <h2 className='bookshelf-title'>
                        <img className='book-img' src={minibook} alt='book-img'></img> {shelf} - {books.length}
                    </h2>
                    <div className='bookshelf-books'>
                        <ol className='books-grid'>
                            {books.length === 0 ?
                                listBook = (
                                    <div key='empty' className='book-card'>
                                        <li key='0'>
                                            <p>No Books</p>
                                        </li>
                                    </div>
                                ) :
                                listBook = books.map((book) =>
                                    <div key={`div-${book.id}`} className='book-card'>
                                        <li key={book.id}>
                                            <Book
                                                book={book}
                                                onChanged={this.changeShelf} />
                                        </li>
                                    </div>
                                )}
                        </ol>
                    </div>
                </div>
            </div>
        )
    }
}

export default Shelf