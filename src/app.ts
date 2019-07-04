import * as express from 'express';
import * as bodyParser from "body-parser";
import {RequestHandler} from "./requestHandler";
import {BookController} from "./router/bookController";
import {LoginController} from "./router/loginController";

const app = express();
const port = 3000;
let handler = new RequestHandler("postgres://bookish:bookish@localhost:5432/bookish");
let bookRouter = new BookController(handler).router;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use("/book", bookRouter);

let loginRouter = new LoginController().router;

app.use('/login', loginRouter);

app.use(express.static("site"));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));