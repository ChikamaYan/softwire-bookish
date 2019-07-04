import * as pgp from "pg-promise";

const pgpDB = pgp();

import {Book} from "./book";
import {User} from "./user";
import {AnyAaaaRecord} from "dns";

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
            // const bookTitle = "LOTR";// let books: Book[] = [];
            //
            // let query = "SELECT b.bookID,\n" +
            //     "       b.ISBN,\n" +
            //     "       bi.title,\n" +
            //     "       bi.author,\n" +
            //     "       bi.catalogue,\n" +
            //     "       br.userID,\n" +
            //     "       u.name,\n" +
            //     "       br.returnDate\n" +
            //     "FROM books b\n" +
            //     "         LEFT JOIN bookInfo bi on b.ISBN = bi.ISBN\n" +
            //     "         LEFT JOIN borrowed br on b.bookID = br.bookID\n" +
            //     "         LEFT JOIN users u on br.userID = u.userID \n" +
            //     "WHERE bi.title = @title";
            //
            // this.db.query(query, bookTitle);

            return await this.db.any("SELECT b.bookID,\n" +
                "       b.ISBN,\n" +
                "       bi.title,\n" +
                "       bi.author,\n" +
                "       bi.catalogue,\n" +
                "       br.userID,\n" +
                "       u.name,\n" +
                "       br.returnDate\n" +
                "FROM books b\n" +
                "         LEFT JOIN bookInfo bi on b.ISBN = bi.ISBN\n" +
                "         LEFT JOIN borrowed br on b.bookID = br.bookID\n" +
                "         LEFT JOIN users u on br.userID = u.userID;", [true]) as Book[];

            // for (let b of data) {
            //     let book: Book = {
            //         bookid: b.bookid,
            //         isbn: b.isbn,
            //         title: b.title,
            //         author: b.author,
            //         catalogue: b.catalogue,
            //         userid: b.userid,
            //         username: b.username,
            //         returndate: b.returndate
            //     };
            //
            //     books.push(book);
            // }

        } catch (e) {
            console.log(e);
        }
    }
    async addBook(isbn: number, title: string, author: string, catalogue: string): Promise<void> {

        await this.db.one(`INSERT INTO bookInfo VALUES(${isbn},'${title}','${author}','${catalogue}')`)
            .catch(error => {
                console.log('ERROR:', error);
            });

        await this.db.one(`INSERT INTO books(isbn) VALUES (${isbn})`)
            .catch(error => {
                console.log('ERROR:', error);
            });
        return;
    }
}