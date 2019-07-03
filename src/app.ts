import * as express from 'express';
import {RequestHandler} from "./requestHandler";
import * as jwt from "jsonwebtoken";

import * as passportJwt from 'passport-jwt';

let JwtStrategy = passportJwt.Strategy;

import * as passport from "passport";

const loginData = require("./../data/login");

const app = express();
const port = 3000;

let SECRET_KEY = "perfect key";

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


app.get("/book", passport.authenticate('jwt', {session: false}), (req, res, next) => {

    let handler = new RequestHandler("postgres://bookish:bookish@localhost:5432/bookish");
    handler.requestBooks().then(data => {
        res.send(JSON.stringify(data));
    });
});

app.get("/login", (req, res, next) => {
    let token = "Invalid";
    if (verifyUser(req.query.username, req.query.password)) {
        token = jwt.sign({username: req.query.username}, SECRET_KEY);
        // console.log(token);
    }
    res.send(token);
});

app.use(express.static("site"));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

function verifyUser(username, password) {
    let userObject = loginData.logins.find((user) => user.username === username);
    if ((userObject) && (userObject.password === password)) {
        return true;
    }
    return false;
}