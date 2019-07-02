import * as express from 'express';
import {RequestHandler} from "./requestHandler";
import * as jwt from "jsonwebtoken";

const loginData = require("./../data/login");

const app = express();
const port = 3000;

app.get("/book", (req, res, next) => {

    let handler = new RequestHandler("postgres://bookish:bookish@localhost:5432/bookish");
    handler.requestBooks().then(data => {
        res.send(JSON.stringify(data));
    });
});

app.get("/login", (req, res, next) => {
    let token = "Invalid";
    if (verifyUser(req.query.username, req.query.password)) {
        token = jwt.sign({username: req.query.username}, "perfect key");
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