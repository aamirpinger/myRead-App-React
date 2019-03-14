import React from 'react'

function BookOnShelf(props) {
    const { books, shelfChangeHandler } = props
    return (
        <div className="bookshelf-books">
            <ol className="books-grid" >
                {
                    (books.length === 0)
                        ? <h3>Nothing to display</h3>
                        : books.map((book) => {
                            return (
                                <li key={book.id}>
                                    <div className="book">
                                        <div className="book-top">
                                            {
                                                (book.imageLinks) &&
                                                <div className="book-cover"
                                                    style={{
                                                        width: 128,
                                                        height: 193,
                                                        backgroundImage: `url(${book.imageLinks.thumbnail})`
                                                    }}
                                                ></div>
                                            }
                                            <div className="book-shelf-changer">
                                                <select
                                                    id={book.id}
                                                    value={(book.shelf) ? book.shelf : 'none'}
                                                    onChange={(event) => shelfChangeHandler(book, event.target.value)}
                                                >
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

export default BookOnShelf;