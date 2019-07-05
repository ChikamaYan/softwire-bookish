import {Sequelize, Model, DataTypes, BuildOptions} from 'sequelize';
import {type} from "os";

export interface BookInfo extends Model {
    readonly ISBN: number,
    readonly title: string,
    readonly author: string,
    readonly catalogue: string
}

type BookInfoStatic = typeof Model &{
    new (values?: object, options?: BuildOptions): BookInfo;
}

export class BookInfoRepo {
    private sql: any;
    bookInfo: any;

    constructor(url) {
        this.sql = new Sequelize(url);
        this.bookInfo = <BookInfoStatic>this.sql.define("bookinfos", {
            ISBN: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true
            },
            title: {
                type: DataTypes.STRING
            },
            author: {
                type: DataTypes.STRING
            },
            catalogue: {
                type: DataTypes.STRING
            }
        });
        this.bookInfo.sync();
    }

    getInfoByISBN(isbn): Promise<BookInfo[]> {
        return this.bookInfo.findAll({
            where: {
                ISBN: isbn
            }
        });
    }

    getInfoByTitle(title): Promise<BookInfo[]> {
        return this.bookInfo.findAll({
            where: {
                title: title
            }
        });
    }

    getInfoByCatalogue(catalogue): Promise<BookInfo[]> {
        return this.bookInfo.findAll({
            where: {
                catalogue: catalogue
            }
        });
    }

    getInfoByAuthor(author): Promise<BookInfo[]> {
        return this.bookInfo.findAll({
            where: {
                author: author
            }
        });
    }

    create(ISBN, title, author, catalogue): Promise<void> {
        return this.bookInfo.create({
            ISBN: ISBN,
            title: title,
            author: author,
            catalogue: catalogue
        })
    }
}

