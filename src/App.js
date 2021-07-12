import React from 'react';
import { Route } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import Search from './Search';
import BookResults from './BookResults';
import './App.css';

class BooksApp extends React.Component {
    state = {
        books: [],
        loading: true
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
            console.log(res);
            Object.keys(res).forEach(shelf => {
                res[shelf].forEach(bookId => {
                    let newItem = 1;
                    for (let i = 0; i < books.length; i++) {
                        if (books[i].id === bookId) {
                            books[i].shelf = shelf;
                            newBooks.push(books[i]);
                            newItem = 0;
                            break;
                        }
                    }
                    if (newItem) {
                        BooksAPI.get(bookId).then(res => {
                            this.setState(prevState => ({
                                books: [...prevState.books, res]
                            }))
                        });
                    }
                });
            });
            this.setState({ books: newBooks });
        });
    };

    render () {
        return (
            <div className="app">
                <Route exact path="/" render={() => (
                    <BookResults books={this.state.books} loading={this.state.loading} updateBook={this.updateBook}/>
                )}/>
                <Route path="/search" render={() => (
                    <Search updateBook={this.updateBook} books={this.state.books} />
                )}/>
            </div>
        );
    }
}

export default BooksApp;
