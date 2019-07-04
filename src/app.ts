import * as express from 'express';
import * as bodyParser from "body-parser";
import {RequestHandler} from "./requestHandler";
import {BookController} from "./router/bookController";
import {LoginController} from "./router/loginController";
import {BookRepo} from "./repo/bookRepo";
import {BookInfoRepo} from "./repo/bookInfoRepo";
import {BorrowedRepo} from "./repo/borrowedRepo";
import {UserRepo} from "./repo/userRepo";
import {BookService} from "./service/bookService";


const app = express();
const port = 3000;
const URL = "postgres://bookish:bookish@localhost:5432/bookish";
let handler = new RequestHandler(URL);

let bookRepo = new BookRepo(URL);
let bookInfoRepo = new BookInfoRepo(URL);

let bookService = new BookService(bookRepo,bookInfoRepo);

let bookRouter = new BookController(handler,bookService).router;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use("/book", bookRouter);

let loginRouter = new LoginController().router;

app.use('/login', loginRouter);

app.use(express.static("site"));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));