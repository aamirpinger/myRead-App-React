import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Shelf from './Shelf'
import SearchComponent from './SearchComponent'

class BooksApp extends React.Component {
  state = {
    showSearchPage: false,
    currentlyReading: [],
    wantToRead: [],
    read: [],
    searchResult: [],
    searchTerm: '',

  }


  getAllBooksArray = () => {
    let tempArray = [...this.state.currentlyReading, ...this.state.wantToRead, ...this.state.read]
    return tempArray


  }
  getAlltToState = () => {

    BooksAPI.getAll()
      .then((books) => {
        let wantToRead = [],
          read = [],
          currentlyReading = []

        books.map((book) => {
          const { shelf } = book

          switch (shelf) {
            case 'currentlyReading':
              currentlyReading.push(book)
              return null
            case 'wantToRead':
              wantToRead.push(book)
              return null
            case 'read':
              read.push(book)
              return null
            default:
              return null
          }
        })

        this.setState({
          currentlyReading,
          wantToRead,
          read
        })
        this.findBooks(this.state.searchTerm)
      })
      .catch((err) => {
        console.log("Error fetching data", err)
      })
  }


  // shelfChangeHandler = (elementId, bookId, currentShelf, newShelf) => {
  //   let tempNewShelf = []

  //   if (currentShelf === 'none') {
  //     tempNewShelf = [...this.state[newShelf]]

  //     BooksAPI.get(bookId)
  //       .then((book) => {

  //         tempNewShelf.push(book)
  //         this.setState((prevState) => ({
  //           ...prevState,
  //           [newShelf]: tempNewShelf,
  //         }))

  //       })
  //   }
  //   else {

  //     let tempCurrentShelf = [...this.state[currentShelf]]
  //     if (newShelf !== 'none') {
  //       tempNewShelf = [...this.state[newShelf]]

  //       tempCurrentShelf[elementId] = {
  //         shelf: newShelf,
  //         ...tempCurrentShelf[elementId],
  //       }

  //       tempNewShelf.push(tempCurrentShelf[elementId])


  //     }
  //     tempCurrentShelf.splice(elementId, 1)

  //     this.setState((prevState) => ({
  //       ...prevState,
  //       [currentShelf]: tempCurrentShelf,
  //       [newShelf]: (newShelf !== 'none') ? tempNewShelf : prevState[newShelf],
  //     }))
  //   }
  // }

  findBookShelf(bookId) {
    const allBooks = this.getAllBooksArray()

    let bookRec = allBooks.filter((book) => book.id === bookId)

    return (bookRec.length !== 0) ? bookRec[0].shelf : 'none'
  }

  findBooks = (txtInput) => {
    BooksAPI.search(txtInput)
      .then((books) => {

        let newBooks = books.map((book) => {
          book.shelf = this.findBookShelf(book.id)
          return book
        })

        this.setState((prevState) => {
          return ({
            ...prevState,
            searchTerm: txtInput,
            searchResult: newBooks,

          })
        }
        )
      })
      .catch((err) => {
        console.log("Error fetching data", err)
        this.setState({
          books: [],
          searchTerm: txtInput
        })
      })
  }

  shelfChangeHandler = (elementId, bookId, currentShelf, newShelf) => {
    BooksAPI.update({ id: bookId }, newShelf)
      .then(book => {
        this.getAlltToState()
      })
      .catch((err) => console.log("Error updating shelf", err))
  }

  componentDidMount() {
    this.getAlltToState()
  }

  render() {
    return (
      <div className="app" >
        {
          this.state.showSearchPage ? (
            <SearchComponent findBooks={this.findBooks} searchResult={this.state.searchResult} shelfChangeHandler={this.shelfChangeHandler} />
          ) : (
              <div className="list-books">
                <div className="list-books-title">
                  <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                  {
                    (!this.state.currentlyReading) ?
                      (<div>
                        <div className="bookshelf">
                          <h2 className="bookshelf-title">Loading data, please wait...</h2>
                        </div>
                      </div>)
                      :
                      <div>
                        <Shelf
                          shelf='Currently Reading'
                          books={this.state.currentlyReading}
                          shelfChangeHandler={this.shelfChangeHandler}
                        />
                        <Shelf
                          shelf='Want to Read'
                          books={this.state.wantToRead}
                          shelfChangeHandler={this.shelfChangeHandler}
                        />
                        <Shelf
                          shelf='Read'
                          books={this.state.read}
                          shelfChangeHandler={this.shelfChangeHandler}
                        />
                      </div>

                  }
                </div>
                <div className="open-search">
                  <button onClick={() => this.setState({ showSearchPage: true })}>Add a book</button>
                </div>
              </div>
            )
        }
      </div>
    )
  }
}

export default BooksApp
