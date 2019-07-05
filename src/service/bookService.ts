import * as pgp from "pg-promise";
import * as moment from "moment";

const pgpDB = pgp();

import {Book} from "../book";
import {User} from "../user";
import {Model} from "sequelize";

export class BookService {
    private bookRepo: any;
    private bookInfoRepo;

    constructor(bookRepo, bookInfoRepo) {
        this.bookRepo = bookRepo;
        this.bookInfoRepo = bookInfoRepo;
    }

    getAllBooks(): Promise<Model[]> {
        return this.bookRepo.getAllBooks();
    }

    getBookInfoByISBN(isbn): Promise<Model[]> {
        return this.bookInfoRepo.getInfoByISBN(isbn);
    }

    getBookByISBN(isbn): Promise<Model[]> {
        return this.bookRepo.getBookByISBN(isbn);
    }

    // async addBook(isbn: number, title: string, author: string, catalogue: string): Promise<Book> {
    //
    //     let ids = await this.db.any(
    //         "SELECT bookID\n" +
    //         "FROM books"
    //         , [true]);
    //
    //     ids = ids.map(i => parseInt(i.bookid));
    //
    //     let newId = Math.max.apply(Math, ids) + 1;
    //
    //     await this.db.one(`INSERT INTO bookInfo VALUES(${isbn},'${title}','${author}','${catalogue}')`)
    //         .catch(error => {
    //             console.log('ERROR:', error);
    //         });
    //
    //     await this.db.one(`INSERT INTO books VALUES (${newId},${isbn})`)
    //         .catch(error => {
    //             console.log('ERROR:', error);
    //         });
    //
    //
    //     return await this.db.any(
    //         "SELECT b.bookID,\n" +
    //         "       b.ISBN,\n" +
    //         "       bi.title,\n" +
    //         "       bi.author,\n" +
    //         "       bi.catalogue\n" +
    //         "FROM books b\n" +
    //         "         LEFT JOIN bookInfo bi on b.ISBN = bi.ISBN\n" +
    //         `WHERE b.bookID = ${newId}`, [true]
    //     ) as Book;
    // }
}