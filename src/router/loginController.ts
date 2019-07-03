import {Router} from "express";
import {RequestHandler} from "../requestHandler";

import * as passport from "passport";
import * as passportJwt from 'passport-jwt';
import * as jwt from "jsonwebtoken";

const loginData = require("./../../data/login");

let JwtStrategy = passportJwt.Strategy;
let SECRET_KEY = "perfect key";

export class LoginController {
    router: any;

    constructor() {
        this.router = Router();
        this.router.get("/login", this.verify.bind(this));
    }

    verify(req, res, next) {
        let token = "Invalid";
        if (this.verifyUser(req.query.username, req.query.password)) {
            token = jwt.sign({username: req.query.username}, SECRET_KEY);
            // console.log(token);
        }
        res.send(token);
    }

    verifyUser(username, password) {
        let userObject = loginData.logins.find((user) => user.username === username);
        if ((userObject) && (userObject.password === password)) {
            return true;
        }
        return false;
    }


}