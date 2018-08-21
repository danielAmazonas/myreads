import React, { Component } from 'react'
import Shelf from './Shelf'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

class ListBooks extends Component {
    static propTypes = {
        currentlyReading: PropTypes.array.isRequired,
        wantToRead: PropTypes.array.isRequired,
        read: PropTypes.array.isRequired,
        onChanged: PropTypes.func.isRequired
    }

    onChanged(book, newShelf) {
        this.props.onChanged(book, newShelf)
    }

    render() {
        const { currentlyReading, wantToRead, read } = this.props
        
        return (
            <div className='list-books'>
                <div className='list-books-title'>
                    <h1>MyReads</h1>
                </div>
                <div className='list-books-content'>
                    <div>
                        <Shelf
                            shelf={'Currently Reading'}
                            books={currentlyReading}
                            onChanged={this.onChanged} />
                        <Shelf
                            shelf={'Want To Read'}
                            books={wantToRead}
                            onChanged={this.onChanged} />
                        <Shelf
                            shelf={'Read'}
                            books={read}
                            onChanged={this.onChanged} />
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