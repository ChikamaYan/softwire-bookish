import * as Sequelize from "sequelize";
import {Model} from "sequelize";

export class BookRepo {
    private sql: any;
    book: any;

    constructor(url) {
        this.sql = new Sequelize.Sequelize(url);
        this.book = this.sql.define("books", {
            bookID: {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true
            },
            ISBN: {
                type: Sequelize.INTEGER
            }
        });
        this.book.sync();
    }

    getAllBooks(): Promise<Model[]> {
        return this.book.findAll();
    }

    getBookByISBN(isbn): Promise<Model[]> {
        return this.book.findAll({
            where: {
                ISBN: isbn
            }
        });
    }

    create(bookID, ISBN): Promise<void> {
        return this.book.create({
            bookID: bookID,
            ISBN: ISBN
        })
    }
}


//
// import * as Sequelize from "sequelize";
//
// export class Book extends Sequelize.Model {
// }
//
// export class BookRepo {
//     private sql: any;
//     book: Book;
//
//     constructor(url) {
//         let sql = new Sequelize.Sequelize(url);
//         this.sql = sql;
//         Book.init({
//             bookID: {
//                 type: Sequelize.INTEGER,
//                 allowNull: false,
//                 primaryKey: true
//             },
//             ISBN: {
//                 type: Sequelize.INTEGER
//             }
//         }, {sequelize: sql, modelName: "books"});
//
//         this.book = Book;
//         Book.sync();
//     }
//
//     getAllBooks(): Promise<any> {
//         return this.book.findAll();
//     }
//
//     create(bookID, ISBN): Promise<void> {
//         return this.book.create({
//             bookID: bookID,
//             ISBN: ISBN
//         })
//     }
// }



