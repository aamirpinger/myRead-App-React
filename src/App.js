import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import SearchComponent from './SearchComponent'
import Rack from './Rack';
import { Route } from 'react-router-dom'
import Loader from "./Loader";

class BooksApp extends React.Component {
  state = {
    connectionFlag: false
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
          read,
          searchResult: [],
          connectionFlag: false
        })
      })
      .catch((err) => {
        console.log("Error fetching data", err)
        this.setState({ connectionFlag: true })
      })
  }

  findBookShelf(bookId) {
    const allBooks = [...this.state.currentlyReading, ...this.state.wantToRead, ...this.state.read]

    let bookRec = allBooks.filter((book) => book.id === bookId)

    // if book already at any shelf return shelf name else return 'none'
    return (bookRec.length !== 0) ? bookRec[0].shelf : 'none'
  }

  findBooks = (txtInput) => {

    (txtInput)
      ? BooksAPI.search(txtInput)
        .then((books) => {
          if (books.error) {
            this.setState({
              searchResult: []
            })
            return
          }
          let newBooks = books.map((book) => {
            //assign current shelf to every book
            book.shelf = this.findBookShelf(book.id)
            return book
          })

          this.setState({ searchResult: newBooks })
        })
        .catch((err) => {
          console.log("Error fetching data", err)
          this.setState({ connectionFlag: true })
        })
      : this.setState({
        searchResult: []
      })
  }

  shelfChangeHandler = (book, newShelf) => {
    let previousShelf = book.shelf

    let currentShelfBooksUpdated = (previousShelf !== 'none')
      ? this.state[previousShelf].filter((rec) => rec.id !== book.id)
      : null

    book.shelf = newShelf


    //optimistic updates for better user experience
    if (newShelf !== 'none' && previousShelf !== 'none') {
      this.setState((prevState) => ({
        [previousShelf]: currentShelfBooksUpdated,
        [newShelf]: [...prevState[newShelf], book],
      }))
    }
    else if (previousShelf === 'none') {
      this.setState((prevState) => ({
        [newShelf]: [...prevState[newShelf], book],
      }))
    }
    else if (newShelf === 'none') {
      this.setState({ [previousShelf]: currentShelfBooksUpdated, })
    }

    BooksAPI.update(book, newShelf)
      .then(() => {
        console.log("Book shelf changed and updated at server")
      })
      .catch((err) => {
        console.log("Error updating shelf", err)

        //  In case of failure response from server following will revert
        //  to prev state because was optimistic updates        

        let currentShelfBooksUpdated = (newShelf !== 'none')
          ? this.state[newShelf].filter((rec) => rec.id !== book.id)
          : null

        book.shelf = previousShelf

        if (newShelf !== 'none' && previousShelf !== 'none') {
          this.setState((prevState) => ({
            [newShelf]: currentShelfBooksUpdated,
            [previousShelf]: [...prevState[previousShelf], book],
          }))
        }
        else if (previousShelf === 'none') {
          this.setState({
            [newShelf]: currentShelfBooksUpdated,
          })
        }
        else if (newShelf === 'none') {
          this.setState((prevState) => ({
            [previousShelf]: [...prevState[previousShelf], book],
          }))
        }
      })

  }

  componentDidMount() {
    this.getAlltToState()
  }

  render() {
    return (
      <div className="list-books">

        {
          (this.state.connectionFlag)
            ? <Loader msg="Unable to load data, please try again later" />
            : <div className="app" >
              <Route exact path="/" render={() => (
                <Rack
                  shelfChangeHandler={this.shelfChangeHandler}
                  currentlyReading={this.state.currentlyReading}
                  wantToRead={this.state.wantToRead}
                  read={this.state.read}
                />)}
              />


              <Route exact path="/search" render={() => (
                <SearchComponent
                  findBooks={this.findBooks}
                  searchResult={this.state.searchResult}
                  shelfChangeHandler={this.shelfChangeHandler}
                />)}
              />
            </div>
        }
      </div>

    )
  }
}

export default BooksApp
