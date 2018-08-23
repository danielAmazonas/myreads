import React, { Component } from 'react'
import Search from './Search'
import ListBooks from './ListBooks'
import * as BooksAPI from './BooksAPI'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './App.css'

class App extends Component {
    state = {
        books: []
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
        book.shelf = newShelf

        BooksAPI.update(book, newShelf).then(() => {
            console.log(book)
            this.setState((state) => ({
                books: state.books.filter((b) => b.id !== book.id).concat([book])
            }))
        })
    }

    render() {
        //Desestruturação de objetos
        const { books } = this.state

        return (
            <div className='app' >
                <Router>
                    <div>
                        <Route
                            exact
                            path='/'
                            render={() => (
                                <ListBooks
                                    currentlyReading={books.filter((book) => book.shelf === 'currentlyReading')}
                                    wantToRead={books.filter((book) => book.shelf === 'wantToRead')}
                                    read={books.filter((book) => book.shelf === 'read')}
                                    onChanged={this.changeShelf}
                                />
                            )} />
                        <Route path='/search' render={() => (
                            <Search onChanged={this.changeShelf} />
                        )} />
                    </div>
                </Router>
            </div>
        )
    }
}

export default App