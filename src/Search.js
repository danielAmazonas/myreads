import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Book from './Book'
import PropTypes from 'prop-types'

class Search extends Component {
    state = {
        showingBooks: [],
        query: '',
        books: []
    }

    static propTypes = {
        onChanged: PropTypes.func.isRequired
    }

    componentDidMount() {
        BooksAPI.getAll().then((books) => {
            this.setState({ books })
        })
    }

    /**
     * @description Função de mudança de prateleira
     */
    changeShelf = (book, newShelf) => {
        this.props.onChanged(book, newShelf)
    }

    /**
     * @description Função que atualiza o texto da consulta
     */
    updateQuery = (query) => {
        this.setState({ query: query.trim() })
        if (query === '') {
            this.clearShowingBooks
        }
        this.search(query)
    }

    /**
     * @description Função de Busca
     */
    search = (query) => {
        BooksAPI.search(query).then((showingBooks) => {
            if (showingBooks === undefined)
                return this.clearShowingBooks
            if (showingBooks.hasOwnProperty('error'))
                return this.clearShowingBooks
            this.setState({ showingBooks })
        })
    }

    /**
     * @description Função que limpa a lista de livros
     */
    clearShowingBooks = () => {
        this.setState({ showingBooks: [] })
    }

    render() {
        //Desestruturação de objetos
        const { showingBooks, query, books } = this.state

        //Filtro de cada prateleira
        const currentlyReading = books.filter((book) => book.shelf === 'currentlyReading')
        const wantToRead = books.filter((book) => book.shelf === 'wantToRead')
        const read = books.filter((book) => book.shelf === 'read')

        //Merge das prateleiras
        let mergedBooks = currentlyReading.concat(wantToRead, read)
        
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
                                <Book
                                    book={book}
                                    onChanged={this.changeShelf} />
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        )
    }
}

export default Search