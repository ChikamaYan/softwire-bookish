import {BookInfo} from "../repo/bookInfoRepo";
import {BookType} from "../repo/bookRepo";

export class BookService {
    private bookRepo;
    private bookInfoRepo;

    constructor(bookRepo, bookInfoRepo) {
        this.bookRepo = bookRepo;
        this.bookInfoRepo = bookInfoRepo;
    }

    getAllBooks(): Promise<BookType[]> {
        return this.bookRepo.getAllBooks();
    }

    getBookInfoByISBN(isbn): Promise<BookInfo[]> {
        return this.bookInfoRepo.getInfoByISBN(isbn);
    }

    getBookInfoByTitle(title): Promise<BookInfo[]> {
        return this.bookInfoRepo.getInfoByTitle(title);
    }

    getBookInfoByCatalogue(catalogue): Promise<BookInfo[]> {
        return this.bookInfoRepo.getInfoByCatalogue(catalogue);
    }

    getBookInfoByAuthor(author): Promise<BookInfo[]> {
        return this.bookInfoRepo.getInfoByAuthor(author);
    }

    getBookByISBN(isbn): Promise<BookType[]> {
        return this.bookRepo.getBookByISBN(isbn);
    }

    getBookByBookID(bookID): Promise<BookType> {
        return this.bookRepo.getBookByBookID(bookID);
    }

    async addBook(ISBN, title, author, catalogue): Promise<number> {
        this.bookInfoRepo.create(ISBN, title, author, catalogue);
        let ids = await this.bookRepo.getAllBooks();
        ids = ids.map(i => parseInt(i.bookID));
        let newId = Math.max.apply(Math, ids) + 1;
        await this.bookRepo.create(newId, ISBN);
        return newId;
    }

    // async addBook(isbn: number, title: string, author: string, catalogue: string): Promise<BookType> {
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
    //     ) as BookType;
    // }
}