import React, {Fragment, useState} from 'react';

function EditBook({book}) {

    const [title, setTitle] = useState(book.title);
    const [author, setAuthor] = useState(book.author);
    const [status, setStatus] = useState(book.status);

    // update book
    const updateBook = async (e) => {
        e.preventDefault();

        try {
            const body = {
                title, author, status
            };

            await fetch(`/api/books/${book.book_id}`, {
                method: "PUT", headers: {"Content-type": "application/json"}, body: JSON.stringify(body)
            });

            window.location = "/";

        } catch (err) {
            console.error(err.message);
        }
    }

    return (<Fragment>

            <button
                type="button"
                className="btn btn-warning"
                data-toggle="modal"
                data-target={`#id${book.book_id}`}
            >
                Edit
            </button>

            <div
                className="modal fade"
                id={`id${book.book_id}`}
                tabIndex="-1"
                role="dialog"
            >
                <div className="modal-dialog" role="document">
                    <div className="modal-content">

                        <div className="modal-header">
                            <h5 className="modal-title">Edit Book</h5>

                            <button
                                type="button"
                                className="close"
                                data-dismiss="modal"
                                onClick={() => {
                                    setTitle(book.title);
                                    setAuthor(book.author);
                                    setStatus(book.status);
                                }}
                            >
                                <span>&times;</span>
                            </button>
                        </div>

                        <div className="modal-body">

                            <input
                                className="form-control mb-2"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Title"
                            />

                            <input
                                className="form-control mb-2"
                                value={author}
                                onChange={(e) => setAuthor(e.target.value)}
                                placeholder="Author"
                            />

                            <select
                                className="form-control"
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                            >
                                <option value="unread">Unread</option>
                                <option value="reading">Reading</option>
                                <option value="finished">Finished</option>
                            </select>

                        </div>

                        <div className="modal-footer">

                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-dismiss="modal"
                            >
                                Close
                            </button>

                            <button
                                type="button"
                                className="btn btn-warning"
                                onClick={updateBook}
                            >
                                Save
                            </button>

                        </div>

                    </div>
                </div>
            </div>

        </Fragment>);
}

export default EditBook;