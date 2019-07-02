-- Database: bookish

-- DROP DATABASE bookish;

-- CREATE DATABASE bookish
--     WITH
--     OWNER = bookish
--     ENCODING = 'UTF8'
--     LC_COLLATE = 'English_United Kingdom.1252'
--     LC_CTYPE = 'English_United Kingdom.1252'
--     TABLESPACE = pg_default
--     CONNECTION LIMIT = -1;

CREATE TABLE bookInfo
(
    ISBN      int NOT NULL,
    title     varchar(255),
    author    varchar(255),
    catalogue varchar(255),
    PRIMARY KEY (ISBN)
);

CREATE TABLE books
(
    bookID int NOT NULL,
    ISBN   int,
    PRIMARY KEY (bookId),
    FOREIGN KEY (ISBN) REFERENCES bookInfo (ISBN)
);

CREATE TABLE users
(
    userID int NOT NULL,
    name   varchar(255),
    PRIMARY KEY (userID)
);

CREATE TABLE borrowed
(
    bookID     int NOT NULL,
    userID     int NOT NULL,
    returnDate date,
    PRIMARY KEY (bookID, userID),
    FOREIGN KEY (bookID) REFERENCES books (bookID),
    FOREIGN KEY (userID) REFERENCES users (userID)
);
