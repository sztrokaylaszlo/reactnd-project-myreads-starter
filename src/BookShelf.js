import React from 'react';
import Book from './Book';

class BookShelf extends React.Component {
    render() {
        const books = this.props.books;
        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{this.props.title}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {
                            books.map((book) => (
                                <Book book={book} />
                            ))
                        }
                    </ol>
                </div>
            </div>
        )
    }
}

export default BookShelf;
