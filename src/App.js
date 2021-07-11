import React from 'react';
import * as BooksAPI from './BooksAPI';
import BookShelf from './BookShelf';
import './App.css';

class BooksApp extends React.Component {
    state = {
        books: [],
        loading: true,
        /**
         * TODO: Instead of using this state variable to keep track of which page
         * we're on, use the URL in the browser's address bar. This will ensure that
         * users can use the browser's back and forward buttons to navigate between
         * pages, as well as provide a good URL they can bookmark and share.
         */
        showSearchPage: false
    };

    componentDidMount () {
        BooksAPI.getAll().then(data => {
            this.setState({ books: data, loading: false });
        });
    }

    updateBook = (book, shelf) => {
        BooksAPI.update(book, shelf).then(res => {
            let books = JSON.parse(JSON.stringify(this.state.books));
            let newBooks = [];
            Object.keys(res).forEach(shelf => {
                res[shelf].forEach(bookId => {
                    for (let i = 0; i < books.length; i++) {
                        if (books[i].id === bookId) {
                            books[i].shelf = shelf;
                            newBooks.push(books[i]);
                        }
                    }
                });
            });
            this.setState({ books: newBooks });
        });

    };

    render () {
        const books = this.state.books;
        return (
            <div className="app">
                {this.state.loading ? (<div>Loading...</div>) : (
                    <div className="list-books">
                        <div className="list-books-title">
                            <h1>MyReads</h1>
                        </div>
                        <div className="list-books-content">
                            <div>
                                <BookShelf title="Currently Reading"
                                           shelf="currentlyReading"
                                           books={books.filter(book => book.shelf === 'currentlyReading')}
                                           updateBook={this.updateBook}/>
                                <BookShelf title="Want to read"
                                           shelf="wantToRead"
                                           books={books.filter(book => book.shelf === 'wantToRead')}
                                           updateBook={this.updateBook}/>
                                <BookShelf title="Read"
                                           shelf="read"
                                           books={books.filter(book => book.shelf === 'read')}
                                           updateBook={this.updateBook}/>
                            </div>
                        </div>
                        <div className="open-search">
                            <button onClick={() => this.setState({ showSearchPage: true })}>Add a book</button>
                        </div>
                    </div>)

                }
            </div>
        );
    }
}

export default BooksApp;
