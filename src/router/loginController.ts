import {Router} from "express";
import * as jwt from "jsonwebtoken";
import {CookieHandler} from "./cookieHandler";
import * as passport from "passport";

const loginData = require("./../../data/login");
let SECRET_KEY = "perfect key";

export class LoginController {
    router: any;
    private cookieHandler: CookieHandler;

    constructor() {
        this.router = Router();
        this.cookieHandler = new CookieHandler();
        this.cookieHandler.setStrategy(passport, SECRET_KEY);
        this.router.get("/login", this.verify.bind(this));
        this.router.get("/status", passport.authenticate('jwt', {session: false}), this.getStatus.bind(this));
    }

    getStatus(req, res, next) {
        res.send(req.user);
    }

    verify(req, res, next) {
        let token = "Invalid";
        if (this.verifyUser(req.query.username, req.query.password)) {
            token = jwt.sign({username: req.query.username}, SECRET_KEY);
            // console.log(token);
        }
        let response = null;
        if (token !== "Invalid") {
            response = req.query.username;
        }
        res.cookie("jwt", token, {maxAge: 900000}).send(response);

    }

    verifyUser(username, password) {
        let userObject = loginData.logins.find((user) => user.username === username);
        if ((userObject) && (userObject.password === password)) {
            return true;
        }
        return false;
    }


}