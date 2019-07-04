// import * as csv from "csv-parser";
// import * as fs from "fs";
// import * as pgp from "pg-promise";
//
// const pgpDB = pgp();
//
// let db = pgpDB("postgres://bookish:bookish@localhost:5432/bookish");
//
// fs.createReadStream("./data/books.csv")
//     .pipe(csv())
//     .on("data", data => {
//         if (data.isbn && data.isbn != "<null>") {
//             // console.log(data);
//             // console.log(`INSERT INTO bookInfo VALUES(${parseInt(data.isbn)},'${data.title}','${data.author}','${data.book_category_id}')`)
//
//             // db.one(`INSERT INTO bookInfo VALUES(${parseInt(data.isbn)},'${data.title}','${data.author}','${data.book_category_id}')`)
//             //     .then(data => {
//             //         console.log(data);
//             //     }).catch(error => {
//             //     console.log('ERROR:', error); // print error;
//             // });
//
//             db.one(`INSERT INTO books VALUES (${data.id}, ${data.isbn})`)
//                 .then(data => {
//                     console.log(data);
//                 }).catch(error => {
//                 console.log('ERROR:', error); // print error;
//             });
//
//         }
//     });


// import * as Sequelize from "sequelize";
//
// export class BookRepo {
//     private sql: any;
//     user: any;
//
//     constructor(url) {
//         this.sql = new Sequelize.Sequelize(url);
//         this.user = this.sql.define("books", {
//             bookID: {
//                 type: Sequelize.INTEGER,
//                 allowNull: false,
//                 primaryKey: true
//             },
//             ISBN: {
//                 type: Sequelize.INTEGER
//             }
//         })
//     }
// }
//
// let bookRepo = new BookRepo("postgres://bookish:bookish@localhost:5432/bookish");
// bookRepo.user.sync({force: true}).then(() => {
//     return bookRepo.user.create({
//         bookID: 1234,
//         ISBN: 1111111
//     });
// });
// bookRepo.user.findAll().then(data => {
//     console.log(data);
// });

const URL = "postgres://bookish:bookish@localhost:5432/bookish";

import {BookInfoRepo} from "./repo/bookInfoRepo";
import {BookRepo} from "./repo/bookRepo";

let bookInfo = new BookInfoRepo(URL);
let book = new BookRepo(URL);

bookInfo.bookInfo.create({
    ISBN: 123457,
    title: "hello world",
    author: "walter",
    catalogue: "1"
}).then(() => {
    book.create(1233, 123457);
});


