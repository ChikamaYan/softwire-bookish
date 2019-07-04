import {Router} from "express";
import {RequestHandler} from "../requestHandler";
import {CookieHandler} from "./cookieHandler";

import * as passport from "passport";
import {Book} from "../book";

let SECRET_KEY = "perfect key";

export class BookController {
    router: any;
    private handler: RequestHandler;
    private cookieHandler: CookieHandler;

    constructor(handler) {
        this.handler = handler;
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
        this.handler.requestBooks().then(books => {
            let results: Book[] = [];
            for (let b of books) {
                if (b.title.includes(req.query.title)) {
                    results.push(b);
                }
            }
            res.send(results);
        })
    }

    searchByCatalogue(req, res, next) {
        this.handler.requestBooks().then(books => {
            let results: Book[] = [];
            for (let b of books) {
                if (b.catalogue === req.query.catalogue) {
                    results.push(b);
                }
            }
            results = results.sort((a, b) => {
                if (a.title < b.title) {
                    return -1;
                } else if (a.title > b.title) {
                    return 1;
                }
                return 0;
            });
            res.send(results);
        })
    }

    addBook(req, res, next) {
        this.handler.addBook(parseInt(req.body.isbn), req.body.title, req.body.author, req.body.catalogue).then((book) => {
            res.send(book);
        });
    }

    searchByAuthor(req, res, next) {
        this.handler.requestBooks().then(books => {
            let results: Book[] = [];
            for (let b of books) {
                if (b.author.includes(req.query.author)) {
                    results.push(b);
                }
            }
            res.send(results);
        })
    }

    searchByISBN(req, res, next) {
        this.handler.requestBooks().then(books => {
            let results: Book[] = [];
            for (let b of books) {
                if (b.isbn === parseInt(req.query.isbn)) {
                    results.push(b);
                }
            }
            res.send(results);
        })
    }

    getAllBook(req, res, next) {
        this.handler.requestBooks().then(data => {
            res.send(JSON.stringify(data));
        });
    }

    getBorrowedBook(req, res, next) {
        let username = req.user;
        this.handler.requestUsers().then(users => {
            let userid = null;
            for (let u of users) {
                if (u.name === username) {
                    userid = u.userid;
                }
            }
            if (!userid) {
                res.send("No book borrowed!");
                return;
            }
            let borrowedBooks: Book[] = [];
            this.handler.requestBooks().then(books => {
                for (let b of books) {
                    if (b.userid === userid) {
                        borrowedBooks.push(b);
                    }
                }
                res.send(JSON.stringify(borrowedBooks));
            });
        });

    }


}

