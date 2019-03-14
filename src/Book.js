import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Book extends Component {
    static propTypes = {
        book: PropTypes.object.isRequired,
        onChanged: PropTypes.func.isRequired
    }

    /**
     * @description Função de mudança de prateleira
     * @param {*} e 
     */
    changeShelf(e) {
        this.props.onChanged(this.props.book, e)
    }

    render() {
        //Desestruturação de objetos
        const { book } = this.props

        //Marcador
        const mark = '✓'

        return (
            <div className='book'>
                <div className='book-top'>
                    <div
                        className='book-cover'
                        style={{
                            width: 128,
                            height: 193,
                            backgroundImage: `url(${book.hasOwnProperty('imageLinks') ?
                                book.imageLinks.smallThumbnail :
                                ''})`
                        }}></div>
                    <div className='book-shelf-changer'>
                        <select
                            defaultValue={book.shelf}
                            onChange={(event) => this.changeShelf(event.target.value)}>
                            <option
                                value='move'
                                disabled>Move to...</option>
                            <option
                                value='currentlyReading'>
                                {book.shelf === 'currentlyReading' ? mark : ''}
                                Currently Reading</option>
                            <option
                                value='wantToRead'>
                                {book.shelf === 'wantToRead' ? mark : ''}
                                Want to Read</option>
                            <option
                                value='read'>
                                {book.shelf === 'read' ? mark : ''}
                                Read</option>
                            <option
                                value='none'>
                                {book.shelf === 'none' ? mark : ''}
                                None</option>
                        </select>
                    </div>
                </div>
                <div className='book-title'>
                    {book.title}
                </div>
                {book.authors ? book.authors.map((author) =>
                    <div key={`${author}-${book.id}`} className='book-authors'>
                        {author}
                    </div>
                ) : ''}
                <div className='book-published-date'>
                    <span>Published in </span>{book.publishedDate}
                </div>
            </div>
        )
    }
}

export default Book