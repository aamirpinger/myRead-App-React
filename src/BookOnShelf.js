import React, { Component } from 'react';
import { search,update } from './BooksAPI'

class BookOnShelf extends Component {

    shelfChangeHandler = (index, bookId, currentShelf, newShelf) => {
        this.props.shelfChangeHandler(index, bookId, currentShelf, newShelf)
        //  update({ id: bookId }, newShelf)
        //      .then(book => {
        //          this.props.shelfChangeHandler(index, bookId, currentShelf, newShelf)
        //      })
        //      .catch((err) => console.log("Error updating on server", err))

    }

    findBookShelf = (bookId) => this.props.findBookShelf(bookId)



    render() {
        const books = this.props.books
        return (
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {
                        books.map((book, index) => {
                            return (
                                <li key={book.id}>
                                    <div className="book">
                                        <div className="book-top">
                                            {
                                                (book.imageLinks) &&
                                                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                                            }
                                            <div className="book-shelf-changer">
                                                <select id={book.id} value={(book.shelf) ? book.shelf : 'none'} onChange={(event) => this.shelfChangeHandler(index, book.id, book.shelf, event.target.value)}>
                                                    <option value="move" disabled>Move to...</option>
                                                    <option value="currentlyReading" >Currently Reading</option>
                                                    <option value="wantToRead">Want to Read</option>
                                                    <option value="read">Read</option>
                                                    <option value="none">None</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="book-title">
                                            {book.title}
                                        </div>
                                        <div className="book-authors">
                                            {
                                                (book.authors) && `${book.authors.join(', ')}`
                                            }
                                        </div>
                                    </div>
                                </li>
                            )
                        })
                    }
                </ol>
            </div>
        );
    }
}

export default BookOnShelf;