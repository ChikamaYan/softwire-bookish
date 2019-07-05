import {Sequelize, Model, DataTypes, BuildOptions} from 'sequelize';

export interface BookType extends Model {
    readonly ISBN: number,
    readonly bookID: number,
}

type BookStatic = typeof Model &{
    new (values?: object, options?: BuildOptions): BookType;
}

export interface IBookRepo{

}

export class BookRepo {
    private sql: any;
    book: any;

    constructor(url) {
        this.sql = new Sequelize(url);
        this.book = <BookStatic>this.sql.define("books", {
            bookID: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true
            },
            ISBN: {
                type: DataTypes.INTEGER
            }
        });
        this.book.sync();
    }

    getAllBooks(): Promise<BookType[]> {
        return this.book.findAll();
    }

    getBookByISBN(isbn): Promise<BookType[]> {
        return this.book.findAll({
            where: {
                ISBN: isbn
            }
        });
    }

    getBookByBookID(bookID): Promise<BookType> {
        return this.book.findOne({
            where: {
                bookID: bookID
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



