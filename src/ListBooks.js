import React, { Component } from 'react'
import Shelf from './Shelf'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import myreads from './icons/myreads.png'

class ListBooks extends Component {
    static propTypes = {
        currentlyReading: PropTypes.array.isRequired,
        wantToRead: PropTypes.array.isRequired,
        read: PropTypes.array.isRequired,
        onChanged: PropTypes.func.isRequired
    }

    /**
     * @description Função de mudança de prateleira
     */
    changeShelf = (book, newShelf) => {
        this.props.onChanged(book, newShelf)
    }

    render() {
        //Desestruturação de objetos
        const { currentlyReading, wantToRead, read } = this.props

        return (
            <div className='list-books'>
                <div className='list-books-title'>
                    <img src={myreads} alt='myreads'></img>
                </div>
                <div className='list-books-content'>
                    <div>
                        <Shelf
                            shelf={'Currently Reading'}
                            books={currentlyReading}
                            onChanged={this.changeShelf} />
                        <Shelf
                            shelf={'Want To Read'}
                            books={wantToRead}
                            onChanged={this.changeShelf} />
                        <Shelf
                            shelf={'Read'}
                            books={read}
                            onChanged={this.changeShelf} />
                    </div>
                </div>
                <div className='open-search'>
                    <Link to='/search'>Add a book</Link>
                </div>
            </div>
        )
    }
}

export default ListBooks