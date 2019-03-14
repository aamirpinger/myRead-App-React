import React from 'react';
import { Link } from 'react-router-dom'
import Shelf from './Shelf'
import Loader from "./Loader";

function Rack(props) {
    const { currentlyReading, wantToRead, read, shelfChangeHandler } = props

    return (
        <div>
            <div className="list-books-title">
                <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
                {
                    (!currentlyReading) ?
                        (<div>
                            <Loader msg="Loading data, please wait..." />
                        </div>)
                        :
                        <div>
                            <Shelf
                                shelf='Currently Reading'
                                books={currentlyReading}
                                shelfChangeHandler={shelfChangeHandler}
                            />
                            <Shelf
                                shelf='Want to Read'
                                books={wantToRead}
                                shelfChangeHandler={shelfChangeHandler}
                            />
                            <Shelf
                                shelf='Read'
                                books={read}
                                shelfChangeHandler={shelfChangeHandler}
                            />
                        </div>

                }
            </div>
            <div className="open-search">
                <Link to="/search">
                    <button>Add a book</button>
                </Link>
            </div>
        </div>
    );
}


export default Rack;