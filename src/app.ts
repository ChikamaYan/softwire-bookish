import * as express from 'express';


const app = express();
const port = 3000;

app.get("/", (req, res, next) => {
    res.send("hello world");
});

app.use(express.static("site"));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));