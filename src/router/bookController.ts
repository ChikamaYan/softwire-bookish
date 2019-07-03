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
        this.router.get("/allBook", passport.authenticate('jwt', {session: false}), this.getAllBook.bind(this));
        this.router.get("/borrowedBook", passport.authenticate('jwt', {session: false}), this.getBorrowedBook.bind(this));
        this.router.get("/searchByTitle", passport.authenticate('jwt', {session: false}), this.searchByTitle.bind(this));
        this.router.get("/searchByAuthor", passport.authenticate('jwt', {session: false}), this.searchByAuthor.bind(this));

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
                    if (b.borrowedby === userid) {
                        borrowedBooks.push(b);
                    }
                }
                res.send(JSON.stringify(borrowedBooks));
            });
        });

    }


}

