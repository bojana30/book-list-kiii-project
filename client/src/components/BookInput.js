import React, {Fragment, useState} from "react";


const BookInput = () => {

    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");

    const onSubmitForm = async (e) => {
        e.preventDefault();
        try {
            const body = {
                title,
                author,
                status: "unread"
            };

            await fetch("http://localhost:8000/books", {
                method: "POST",
                headers: {"Content-type": "application/json"},
                body: JSON.stringify(body)
            });

            setTitle("");
            setAuthor("");

            window.location = "/";

        } catch (err) {
            console.error(err.message)
        }
    };

    return (
        <Fragment>
            <h1 className="text-center mt-5">PERN Book List</h1>
            <form className="d-flex mt-5 gap-3 align-items-center justify-content-center" onSubmit={onSubmitForm}>
                <input
                    className="form-control"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <input
                    className="form-control"
                    placeholder="Author"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                />
                <button className="btn btn-success">Add Book</button>

            </form>
        </Fragment>
    )
};

export default BookInput;