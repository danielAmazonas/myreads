import React, { Component } from 'react'
import Shelf from './Shelf'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

class ListBooks extends Component {
    static propTypes = {

    }

    state = {
        books: []
    }

    render() {
        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        <Shelf />
                    </div>
                </div>
                <div className="open-search">
                    <Link to='/search'>Add a book</Link>
                </div>
            </div>
        )
    }
}

export default ListBooks