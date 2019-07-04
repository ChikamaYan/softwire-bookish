import * as pgp from "pg-promise";
import * as moment from "moment";

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

            let books = await this.db.any("SELECT b.bookID,\n" +
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

            return books.map(b => {
                b.returndate = moment(b.returndate).format("DD-MM-YYYY");
                return b;
            })


        } catch (e) {
            console.log(e);
        }
    }

    async addBook(isbn: number, title: string, author: string, catalogue: string): Promise<Book> {

        let ids = await this.db.any(
            "SELECT bookID\n" +
            "FROM books"
            , [true]);

        ids = ids.map(i => parseInt(i.bookid));

        let newId = Math.max.apply(Math, ids) + 1;

        await this.db.one(`INSERT INTO bookInfo VALUES(${isbn},'${title}','${author}','${catalogue}')`)
            .catch(error => {
                console.log('ERROR:', error);
            });

        await this.db.one(`INSERT INTO books VALUES (${newId},${isbn})`)
            .catch(error => {
                console.log('ERROR:', error);
            });


        return await this.db.any(
            "SELECT b.bookID,\n" +
            "       b.ISBN,\n" +
            "       bi.title,\n" +
            "       bi.author,\n" +
            "       bi.catalogue\n" +
            "FROM books b\n" +
            "         LEFT JOIN bookInfo bi on b.ISBN = bi.ISBN\n" +
            `WHERE b.bookID = ${newId}`, [true]
        ) as Book;
    }
}