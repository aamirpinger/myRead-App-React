import React, { Component } from 'react';
import BookOnShelf from './BookOnShelf'


class Shelf extends Component {
    shelfChangeHandler = (index,bookId, currentShelf, newShelf) => {
        this.props.shelfChangeHandler(index, bookId, currentShelf, newShelf)
    }

    render() {
        const books = this.props.books
        const shelfTitle = this.props.shelf
        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{shelfTitle}</h2>
                <BookOnShelf shelfChangeHandler={this.shelfChangeHandler} books={books} />
            </div>
        );
    }
}

export default Shelf;