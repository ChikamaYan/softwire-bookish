import {Router} from "express";
import {RequestHandler} from "../requestHandler";
import {CookieHandler} from "./cookieHandler";
import {BookView} from "../view/bookView";
import {BookService} from "../service/bookService";
import {UserService} from "../service/userService";

import * as passport from "passport";
import {Book} from "../book";
import {BookType} from "../repo/bookRepo";
import {BookInfo} from "../repo/bookInfoRepo";
import {User} from "../repo/userRepo";
import {Borrowed, BorrowedRepo} from "../repo/borrowedRepo";
import {promises} from "fs";

let SECRET_KEY = "perfect key";

export class BookController {
    router: any;
    private handler: RequestHandler;
    private cookieHandler: CookieHandler;
    private bookService: BookService;
    private userService: UserService;

    constructor(handler, bookService, userService) {
        this.handler = handler;
        this.bookService = bookService;
        this.userService = userService;

        this.cookieHandler = new CookieHandler();
        this.cookieHandler.setStrategy(passport, SECRET_KEY);
        this.router = Router();
        let auth = passport.authenticate('jwt', {session: false});
        this.router.get("/allBook", auth, this.getAllBook.bind(this));
        this.router.get("/borrowedBook", auth, this.getBorrowedBook.bind(this));
        this.router.get("/searchByTitle", auth, this.searchByTitle.bind(this));
        this.router.get("/searchByAuthor", auth, this.searchByAuthor.bind(this));
        this.router.get("/searchByISBN", auth, this.searchByISBN.bind(this));
        this.router.get("/searchByCatalogue", auth, this.searchByCatalogue.bind(this));
        this.router.post("/addBook", auth, this.addBook.bind(this));

    }


    searchByTitle(req, res, next) {
        this.bookService.getBookInfoByTitle(req.query.title).then(bookInfos => {
            let bookViews: BookView[] = [];
            let promises = [];
            for (let i of bookInfos) {
                promises.push(this.bookService.getBookByISBN(i.ISBN).then(books => {
                    bookViews = bookViews.concat(BookController.createBookViews(books, i));
                }))
            }
            Promise.all(promises).then(() => {
                res.send(bookViews);
            })
        });
    }

    searchByCatalogue(req, res, next) {
        this.bookService.getBookInfoByCatalogue(req.query.catalogue).then(bookInfos => {
            let bookViews: BookView[] = [];
            let promises = [];
            for (let i of bookInfos) {
                promises.push(this.bookService.getBookByISBN(i.ISBN).then(books => {
                    bookViews = bookViews.concat(BookController.createBookViews(books, i));
                }))
            }
            Promise.all(promises).then(() => {
                bookViews = bookViews.sort((a, b) => {
                    if (a.title < b.title) {
                        return -1;
                    } else if (a.title > b.title) {
                        return 1;
                    }
                    return 0;
                });
                res.send(bookViews);
            })
        });
    }

    addBook(req, res, next) {
        this.bookService.addBook(parseInt(req.body.isbn), req.body.title, req.body.author, req.body.catalogue).then((bookid) => {
            res.send(bookid.toString());
        });
    }

    searchByAuthor(req, res, next) {
        this.bookService.getBookInfoByAuthor(req.query.author).then(bookInfos => {
            let bookViews: BookView[] = [];
            let promises = [];
            for (let i of bookInfos) {
                promises.push(this.bookService.getBookByISBN(i.ISBN)
                    .then(books => BookController.createBookViews(books, i)
                ))
            }
            Promise.all(promises).then((arrayOfCreatedBooks) => {
                console.log(arrayOfCreatedBooks);
                res.send(JSON.stringify([].concat(...arrayOfCreatedBooks)));
            })
        })
    }

    static createBookViews(books: BookType[], info: BookInfo): BookView[] {
        let bookViews: BookView[] = [];
        for (let b of books) {
            bookViews.push({
                bookID: b.bookID,
                ISBN: b.ISBN,
                title: info.title,
                author: info.author,
                catalogue: info.catalogue
            })
        }
        return bookViews;
    }

    searchByISBN(req, res, next) {
        this.bookService.getBookByISBN(req.query.isbn).then(books => {
            let bookViews: BookView[] = [];
            let promises = [];
            for (let b of books) {
                promises.push(this.bookService.getBookInfoByISBN(b.ISBN).then(info => {
                    bookViews = bookViews.concat(BookController.createBookViews(books, info[0]));
                }));
            }
            Promise.all(promises).then(() => {
                res.send(JSON.stringify(bookViews));
            });
        });
    }

    getAllBook(req, res, next) {
        this.bookService.getAllBooks().then(books => {
            this.createBookViewsByBooks(books).then(bookViews => {
                res.send(JSON.stringify(bookViews));
            });

        });
    }

    async createBookViewsByBooks(books: BookType[]): Promise<BookView[]> {
        let data: BookView[] = [];
        for (let b of books) {
            data = data.concat(await this.createBookViewsByBook(b))
        }

        return data;
    }

    async createBookViewsByBorroweds(borroweds: Borrowed[]): Promise<BookView[]> {
        let data: BookView[] = [];
        for (let borrowed of borroweds) {
            let book = await this.bookService.getBookByBookID(borrowed.bookID);
            data = data.concat(await this.createBookViewsByBook(book))
        }
        return data;
    }

    createBookViewsByBook(b: BookType): Promise<BookView[]> {
        let data: BookView[] = [];
        return this.bookService.getBookInfoByISBN(b.ISBN).then(info => {
            data.push({
                bookID: b.bookID,
                ISBN: b.ISBN,
                title: info[0].title,
                author: info[0].author,
                catalogue: info[0].catalogue
            } as BookView);
            return data;
        })
    }

    getBorrowedBook(req, res, next) {
        let username = req.user;
        this.userService.getUserByUsername(username).then(u => {
            this.userService.getBorrowedByUserID(u.userID).then(borroweds => {
                    this.createBookViewsByBorroweds(borroweds).then(bookViews => {
                        res.send(bookViews);
                    })
                }
            )
        });


        // this.handler.requestUsers().then(users => {
        //     let userid = null;
        //     for (let u of users) {
        //         if (u.name === username) {
        //             userid = u.userid;
        //         }
        //     }
        //     if (!userid) {
        //         res.send("No user borrowed!");
        //         return;
        //     }
        //     let borrowedBooks: Book[] = [];
        //     this.handler.requestBooks().then(books => {
        //         for (let b of books) {
        //             if (b.userid === userid) {
        //                 borrowedBooks.push(b);
        //             }
        //         }
        //         res.send(JSON.stringify(borrowedBooks));
        //     });
        // });

    }


}

