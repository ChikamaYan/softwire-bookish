import {Router} from "express";
import {RequestHandler} from "../requestHandler";

import * as passport from "passport";
import * as passportJwt from 'passport-jwt';

let JwtStrategy = passportJwt.Strategy;
let SECRET_KEY = "perfect key";

export class BookController {
    router: any;
    private handler: RequestHandler;

    constructor(handler) {
        this.handler = handler;
        this.setStrategy();
        this.router = Router();
        this.router.get("/allBook", passport.authenticate('jwt', {session: false}), this.getAllBook.bind(this));

    }

    getAllBook(req, res, next) {
        // let handler = new RequestHandler("postgres://bookish:bookish@localhost:5432/bookish");
        this.handler.requestBooks().then(data => {
            res.send(JSON.stringify(data));
        });
    }


    private setStrategy() {
        function cookieExtractor(req) {
            let token = null;
            // TODO: use proper cookie
            if (req && req.headers.cookie) {
                token = req.headers.cookie;
            }
            return token;
        }

        let opts = {
            jwtFromRequest: cookieExtractor,
            secretOrKey: SECRET_KEY
        };

        passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
            return done(null, jwt_payload.username);
        }));
    }
}

