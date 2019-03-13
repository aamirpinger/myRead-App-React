import React, { Component } from 'react';
import { search, update } from './BooksAPI'
import BookOnShelf from './BookOnShelf'
import './App.css'

class SearchComponent extends Component {
    state = {
        searchTerm: '',
    }

    shelfChangeHandler = (index, bookId, currentShelf, newShelf) => {
        const txtInput = this.state.searchTerm
        this.props.shelfChangeHandler(index, bookId, currentShelf, newShelf)

    }

    handle = (e) => {
        const txtInput = e.target.value
        this.setState({
            searchTerm: txtInput
        })
        this.props.findBooks(txtInput)
    }

    handleSubmit = (e) => {
        e.preventDefault();

        const txtInput = this.state.searchTerm
        search(txtInput)
            .then((books) => {
                books.map((book) => book.shelf = this.findBookShelf(book.id))

                this.setState({
                    books,
                })
            })
            .catch((err) => {
                console.log("Error fetching data", err)
            })
    }

    handleChange = (e) => {
        const txtInput = e.target.value

        this.setState({
            searchTerm: txtInput
        })
    }

    render() {
        const books = this.props.searchResult
        console.log(books, "search")
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <button className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</button>
                    <div className="search-books-input-wrapper">
                        {/*
                NOTES: The search from BooksAPI is limited to a particular set of search terms.
                You can find these search terms here:
                https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                you don't find a specific author or title. Every search is limited by search terms.
              */}
                        <input
                            type="text"
                            placeholder="Search by title or author"
                            onChange={this.handle}
                            value={this.state.txtInput}
                        />

                    </div>

                </div>

                <div className="search-books-results">

                    <BookOnShelf
                        shelfChangeHandler={this.shelfChangeHandler}
                        books={books} />

                </div>
            </div>

        );
    }
}

export default SearchComponent;