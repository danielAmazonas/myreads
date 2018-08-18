import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import Book from './Book'
import PropTypes from 'prop-types'

class Shelf extends Component {
    static propTypes = {
        
    }

    state = {
        currentlyReadingState: [
            {
                'id': 'nggnmAEACAAJ',
            },
            {
                'id': 'IOejDAAAQBAJ',
            }
        ],
        wantToReadState: [
            {
                'id': 'sJf1vQAACAAJ'
            },
            {
                'id': '74XNzF_al3MC'
            }
        ],
        readState: [
            {
                'id': 'evuwdDLfAyYC'
            },
            {
                'id': 'jAUODAAAQBAJ'
            }
        ]
    }

    render() {
        const { currentlyReading, wantToRead, read } = this.props
        const { currentlyReadingState, wantToReadState, readState } = this.state

        return (
            <div>
                <div className="bookshelf">
                    <h2 className="bookshelf-title">Currently Reading</h2>
                    <div className="bookshelf-books">
                        <Book shelf={currentlyReadingState} />
                    </div>
                </div>
                <div className="bookshelf">
                    <h2 className="bookshelf-title">Want to Read</h2>
                    <div className="bookshelf-books">
                        <Book shelf={wantToReadState} />
                    </div>
                </div>
                <div className="bookshelf">
                    <h2 className="bookshelf-title">Read</h2>
                    <div className="bookshelf-books">
                        <Book shelf={readState} />
                    </div>
                </div>
            </div>
        )
    }
}

export default Shelf