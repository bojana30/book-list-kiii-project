const express = require('express');
require("dotenv").config();
const cors = require('cors');
const pool = require('./db')


const app = express();

// middleware
app.use(cors());
app.use(express.json());

// ROUTES

// create a book
app.post('/books', async (req, res) => {
    try {
        const { title, author, status } = req.body;

        const newBook = await pool.query(
            "INSERT INTO books (title, author, status) VALUES ($1, $2, $3) RETURNING *",
            [title, author, status]
        );

        res.status(201).json(newBook.rows[0]);
    } catch (error) {
        res.status(400).send(error.message);
    }
});


// get all books
app.get('/books', async (req, res) => {
    const books = await pool.query("SELECT * FROM books");
    res.json(books.rows);
});


// get a book
app.get('/books/:id', async (req, res) => {
    const book = await pool.query(
        "SELECT * FROM books WHERE book_id = $1",
        [req.params.id]
    );

    res.json(book.rows[0]);
});


// update a booklist
app.put('/books/:id', async (req, res) => {
    const { title, author, status } = req.body;

    const updated = await pool.query(
        "UPDATE books SET title=$1, author=$2, status=$3 WHERE book_id=$4 RETURNING *",
        [title, author, status, req.params.id]
    );

    res.json(updated.rows[0]);
});


// delete a book
app.delete('/books/:id', async (req, res) => {
    const deleted = await pool.query(
        "DELETE FROM books WHERE book_id=$1 RETURNING *",
        [req.params.id]
    );

    if (deleted.rows.length === 0) {
        return res.status(404).send("Book not found");
    }

    res.json(`Book "${deleted.rows[0].title}" deleted`);
});

// PORT 
const port = process.env.PORT || 8000
app.listen(port, () => { console.log(`Your server is listening at ${port}`) })