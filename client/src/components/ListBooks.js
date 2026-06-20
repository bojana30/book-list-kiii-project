import React, { Fragment, useState, useEffect } from 'react';
import EditBook from './EditBook';

const ListBooks = () => {

    const [books, setBooks] = useState([]);

    // delete a book
    const deleteBook = async (id) => {
        try {
            await fetch(`/api/books/${id}`, {
                method: "DELETE"
            });

            // remove deleted book from state
            setBooks(books.filter(book => book.book_id !== id));

        } catch (err) {
            console.error(err.message);
        }
    }

    const getBooks = async () => {
        try {
            const response = await fetch("/api/books");
            const jsonData = await response.json();
            setBooks(jsonData);
        } catch (err) {
            console.error(err.message);
        }
    }

    useEffect(() => {
        getBooks();
    }, []);

    return (
        <Fragment>
            <table className="table mt-5 text-center">
                <thead>
                <tr>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Status</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
                </thead>

                <tbody>
                {books.map(book => (
                    <tr key={book.book_id}>
                        <td>{book.title}</td>
                        <td>{book.author}</td>
                        <td>{book.status}</td>

                        <td>
                            <EditBook book={book} />
                        </td>

                        <td>
                            <button
                                className="btn btn-danger"
                                onClick={() => deleteBook(book.book_id)}
                            >
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </Fragment>
    );
}

export default ListBooks;