import * as pgp from "pg-promise";

const pgpDB = pgp();

import {Book} from "./book";
import {User} from "./user";
import * as pg from "pg-promise/typescript/pg-subset";

export class RequestHandler {
    db;

    constructor(uri) {
        this.db = pgpDB(uri);
    }

    async requestUsers(): Promise<User[]> {
        try {
            let users: User[] = [];
            const data = await this.db.any('SELECT * FROM users', [true]);
            for (let u of data) {
                users.push({userid: u.userid, name: u.name})
            }
            return users;

        } catch (e) {
            console.log(e);
        }
    }

    async requestBooks(): Promise<Book[]> {
        try {
            let books: Book[] = [];

            const data = await this.db.any('SELECT b.bookID, b.ISBN, bi.title, bi.author, bi.catalogue, br.userID, br.returnDate\n' +
                'FROM books b LEFT JOIN bookInfo bi on b.ISBN = bi.ISBN LEFT JOIN borrowed br on b.bookID = br.bookID', [true]);


            for (let b of data) {
                let book: Book = {
                    bookid: b.bookid,
                    isbn: b.isbn,
                    title: b.title,
                    author: b.author,
                    catalogue: b.catalogue,
                    borrowedby: b.userid,
                    returndate: b.returndate
                };

                books.push(book);
            }

            return books;
        } catch (e) {
            console.log(e);
        }

    }
}