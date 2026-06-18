CREATE DATABASE booklist;

CREATE TABLE books
(
    book_id SERIAL PRIMARY KEY,
    title   VARCHAR(255),
    author  VARCHAR(255),
    status  VARCHAR(50) DEFAULT 'unread'
);