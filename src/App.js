import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Shelf from './Shelf'
import SearchComponent from './SearchComponent'

class BooksApp extends React.Component {
  state = {
    showSearchPage: false
  }

  componentDidMount() {
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
      })
      .catch( (err) => {
        console.log("Error fetching data", err)
      })
  }



  shelfChangeHandler = (elementId, bookId, currentShelf, newShelf) => {
    let tempCurrentShelf = [...this.state[currentShelf]]
    let tempNewShelf = []

    BooksAPI.update({ id: bookId }, newShelf)
      .then((updatedRec) => {
        console.log("Book updated at backend")
        if (newShelf !== 'none') {
          tempNewShelf = [...this.state[newShelf]]

          tempCurrentShelf[elementId] = {
            ...tempCurrentShelf[elementId],
            shelf: newShelf
          }

          tempNewShelf.push(tempCurrentShelf[elementId])
        }

        tempCurrentShelf.splice(elementId, 1)

        this.setState((prevState) => ({
          ...prevState,
          [currentShelf]: tempCurrentShelf,
          [newShelf]: (newShelf !== 'none') ? tempNewShelf : prevState[newShelf],
        }))
      })
      .catch((err) => console.log("Error updating on server", err))
  }




  render() {
    return (
      <div className="app" >
        {
          this.state.showSearchPage ? (
            <SearchComponent />
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
