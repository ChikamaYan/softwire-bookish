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

INSERT INTO bookInfo
VALUES (123456, 'test book title', 'walter', 'test');

INSERT INTO bookInfo
VALUES (123457, 'hello world', 'walter', 'test');

INSERT INTO books
VALUES (1000, 123456);

INSERT INTO users
VALUES (11,'walter');

INSERT INTO borrowed
VALUES (1000,11,TO_DATE('03/07/2019','DD/MM/YYYY'))
