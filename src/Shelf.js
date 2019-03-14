import React from 'react'
import BookOnShelf from './BookOnShelf'


function Shelf(props) {
    const { shelfChangeHandler, books, shelf } = props
    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">{shelf}</h2>
            <BookOnShelf shelfChangeHandler={shelfChangeHandler} books={books} />
        </div>
    );
}

export default Shelf;