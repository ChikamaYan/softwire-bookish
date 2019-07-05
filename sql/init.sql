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
VALUES (123456, 'test user title', 'walter', 'test');

INSERT INTO bookInfos
VALUES (123457, 'hello world', 'walter', 'test');

INSERT INTO books
VALUES (1001, 123456);

INSERT INTO users
VALUES (20, 'soma');

INSERT INTO borrowed
VALUES (1674, 20, TO_DATE('23/06/2019', 'DD/MM/YYYY'));

SELECT b.bookID,
       b.ISBN,
       bi.title,
       bi.author,
       bi.catalogue,
       br.userID,
       u.name,
       br.returnDate
FROM books b
         LEFT JOIN bookInfo bi on b.ISBN = bi.ISBN
         LEFT JOIN borrowed br on b.bookID = br.bookID
         LEFT JOIN users u on br.userID = u.userID;

SELECT *
FROM bookinfos;

SELECT *
FROM books;

SELECT *
FROM borrowed;

DELETE
FROM books
WHERE ISBN ISNULL;

DELETE
FROM bookInfo
WHERE ISBN ISNULL;

DROP TABLE books;
DROP TABLE borrowed;
DROP TABLE users;
DROP TABLE bookInfo;

INSERT INTO books(ISBN)
VALUES (1430234709);

INSERT INTO bookInfos
VALUES (1261335, 'The Best JAVA BookType', 'Soma', '4');

SELECT *
FROM bookinfos;

SELECT *
FROM borroweds;

SELECT b.bookID,
       b.ISBN,
       bi.title,
       bi.author,
       bi.catalogue
FROM books b
         LEFT JOIN bookInfo bi on b.ISBN = bi.ISBN
         LEFT JOIN borrowed br on b.bookID = br.bookID
         LEFT JOIN users u on br.userID = u.userID;
