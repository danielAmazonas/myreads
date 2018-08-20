import React, { Component } from 'react'
import Book from './Book'

class Shelf extends Component {
    
    state = {
        currentlyReadingState: [
            {
                'id': 'nggnmAEACAAJ',
                'type': 'currentlyReading'
            },
            {
                'id': 'IOejDAAAQBAJ',
                'type': 'currentlyReading'
            }
        ],
        wantToReadState: [
            {
                'id': 'sJf1vQAACAAJ',
                'type': 'wantToRead'
            },
            {
                'id': '74XNzF_al3MC',
                'type': 'wantToRead'
            }
        ],
        readState: [
            {
                'id': 'evuwdDLfAyYC',
                'type': 'read'
            },
            {
                'id': 'jAUODAAAQBAJ',
                'type': 'read'
            }
        ]
    }

    render() {
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