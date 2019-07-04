import * as csv from "csv-parser";
import * as fs from "fs";
import * as pgp from "pg-promise";

const pgpDB = pgp();

let db = pgpDB("postgres://bookish:bookish@localhost:5432/bookish");

fs.createReadStream("./data/books.csv")
    .pipe(csv())
    .on("data", data => {
        if (data.isbn) {
            // console.log(data);
            // console.log(`INSERT INTO bookInfo VALUES(${parseInt(data.isbn)},'${data.title}','${data.author}','${data.book_category_id}')`)

            db.one(`INSERT INTO bookInfo VALUES(${parseInt(data.isbn)},'${data.title}','${data.author}','${data.book_category_id}')`)
                .then(data => {
                    console.log(data);
                }).catch(error => {
                console.log('ERROR:', error); // print error;
            });

            db.one(`INSERT INTO books VALUES (${data.id}, ${data.isbn})`)
                .then(data => {
                    console.log(data);
                }).catch(error => {
                console.log('ERROR:', error); // print error;
            });

        }
    });

