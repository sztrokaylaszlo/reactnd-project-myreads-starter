import React from 'react';
import {Link} from 'react-router-dom';
import BookShelf from './BookShelf';

class BookResult extends React.Component {

    render () {
        const books = this.props.books;
        return (
            <div>
                {this.props.loading ? (<div>Loading...</div>) : (
                    <div className="list-books">
                        <div className="list-books-title">
                            <h1>MyReads</h1>
                        </div>
                        <div className="list-books-content">
                            <div>
                                <BookShelf title="Currently Reading"
                                           shelf="currentlyReading"
                                           books={books.filter(book => book.shelf === 'currentlyReading')}
                                           updateBook={this.props.updateBook}/>
                                <BookShelf title="Want to read"
                                           shelf="wantToRead"
                                           books={books.filter(book => book.shelf === 'wantToRead')}
                                           updateBook={this.props.updateBook}/>
                                <BookShelf title="Read"
                                           shelf="read"
                                           books={books.filter(book => book.shelf === 'read')}
                                           updateBook={this.props.updateBook}/>
                            </div>
                        </div>
                        <div className="open-search">
                            <Link to='/search'>
                                <button>Add a book</button>
                            </Link>
                        </div>
                    </div>)

                }
            </div>
        );
    }
}

export default BookResult;
