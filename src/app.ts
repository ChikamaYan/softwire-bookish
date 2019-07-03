import * as express from 'express';
import {RequestHandler} from "./requestHandler";
import * as jwt from "jsonwebtoken";
import {BookController} from "./router/bookController";
import {LoginController} from "./router/loginController";

const app = express();
const port = 3000;

let SECRET_KEY = "perfect key";

let handler = new RequestHandler("postgres://bookish:bookish@localhost:5432/bookish");
let bookRouter = new BookController(handler).router;

app.use("/book", bookRouter);

let loginRouter = new LoginController().router;

app.use('/login', loginRouter);

app.use(express.static("site"));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));