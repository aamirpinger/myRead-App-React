import React, { Component } from 'react';
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
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {
                            books.map((book,index) => (
                                <li key={book.id}>
                                    <div className="book">
                                        <div className="book-top">
                                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                                            <div className="book-shelf-changer">

                                                <select value={book.shelf} onChange={(event) => this.shelfChangeHandler(index,book.id, book.shelf, event.target.value)}>
                                                    <option value="move" disabled>Move to...</option>
                                                    <option value="currentlyReading" >Currently Reading</option>
                                                    <option value="wantToRead">Want to Read</option>
                                                    <option value="read">Read</option>
                                                    <option value="none">None</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="book-title">{book.title}</div>
                                        <div className="book-authors">
                                            {
                                                `${book.authors.join(', ')}`
                                            }
                                        </div>
                                    </div>
                                </li>
                            ))
                        }
                    </ol>
                </div>
            </div>
        );
    }
}

export default Shelf;