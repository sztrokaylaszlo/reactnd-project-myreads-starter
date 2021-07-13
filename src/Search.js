import React from 'react';
import { Link } from 'react-router-dom';
import Book from './Book';
import * as BooksAPI from './BooksAPI';

class Search extends React.Component {
    state = {
        results: [],
        searchTerm: ''
    };

    handleKeyUp = (event) => {
        this.setState({ searchTerm: event.target.value });
        setTimeout(() => {
            BooksAPI.search(this.state.searchTerm).then(res => {
                this.setState({ results: res });
            });
        }, 500);
    };

    render () {
        const books = this.props.books;
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to="/">
                        <div className="close-search button">
                            Close
                        </div>
                    </Link>
                    <div className="search-books-input-wrapper">
                        <input type="text" onKeyUp={this.handleKeyUp} placeholder="Search by title or author"/>
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {
                            this.state.results && this.state.results.length>0 ? (
                                this.state.results.map((book) => (
                                    <Book key={book.id}
                                          book={book}
                                          shelf={books.find(item => item.id === book.id) ? books.find(item => item.id === book.id).shelf : 'none'}
                                          updateBook={this.props.updateBook}/>
                                ))
                            ) : ('')
                        }
                    </ol>
                </div>
            </div>
        );
    }
}

export default Search;
