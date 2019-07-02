import * as express from 'express';
import {RequestHandler} from "./requestHandler";

const app = express();
const port = 3000;

app.get("/", (req, res, next) => {

    let handler = new RequestHandler("postgres://bookish:bookish@localhost:5432/bookish");
    handler.requestBooks().then(data => {
        res.send(JSON.stringify(data));
    });
});

app.use(express.static("site"));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));