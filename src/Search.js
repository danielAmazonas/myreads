import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Book from './Book'
import Rating from 'react-rating'
import PropTypes from 'prop-types'
import starempty from './icons/star-empty_1.png'
import starfull from './icons/star-full_1.png'

class Search extends Component {
    state = {
        showingBooks: [],
        query: '',
        books: []
    }

    static propTypes = {
        onChanged: PropTypes.func.isRequired
    }

    /**
     * @description Função que busca os livros das prateleiras
     */
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
        this.setState({ query: query })
        if (query)
            this.search(query)
        else
            this.clearShowingBooks()
    }

    /**
     * @description Função de Busca e comprara com os livros existentes
     * nas prateleiras
     */
    search = (query) => {
        BooksAPI.search(query).then((showingBooks) => {
            if (showingBooks === undefined)
                return this.clearShowingBooks()
            if (showingBooks.hasOwnProperty('error'))
                return this.clearShowingBooks()

            //Filtro de cada prateleira
            const currentlyReading = this.state.books.filter((book) => book.shelf === 'currentlyReading')
            const wantToRead = this.state.books.filter((book) => book.shelf === 'wantToRead')
            const read = this.state.books.filter((book) => book.shelf === 'read')

            //Merge das prateleiras
            let mergedBooks = currentlyReading.concat(wantToRead, read)

            //Variável temporária para filtrar e juntar os livros e seus estados
            let temp = []

            temp = showingBooks.filter((b) => b.shelf = 'none')

            for (let i = 0; i < temp.length; i++) {
                for (let j = 0; j < mergedBooks.length; j++) {
                    if (temp[i].id === mergedBooks[j].id) {
                        temp[i].shelf = mergedBooks[j].shelf
                    }
                }
            }

            this.setState({ showingBooks: temp })
        })
    }

    /**
     * @description Função que limpa a lista de livros
     */
    clearShowingBooks() {
        this.setState({ showingBooks: [] })
    }

    render() {
        //Desestruturação de objetos
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
                            <div key={`div-${book.id}`} className='book-card'>
                                <li key={book.id}>
                                    <Rating
                                        emptySymbol={<img src={starempty} className='icon' alt='star-empty' />}
                                        fullSymbol={<img src={starfull} className='icon' alt='star-full' />}
                                    />
                                    <Book
                                        book={book}
                                        onChanged={this.changeShelf} />
                                </li>
                            </div>
                        ))}
                    </ol>
                </div>
            </div>
        )
    }
}

export default Search