import * as Sequelize from "sequelize";
import {Model} from "sequelize";

export class BookInfoRepo {
    private sql: any;
    bookInfo: any;

    constructor(url) {
        this.sql = new Sequelize.Sequelize(url);
        this.bookInfo = this.sql.define("bookinfos", {
            ISBN: {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true
            },
            title: {
                type: Sequelize.STRING
            },
            author: {
                type: Sequelize.STRING
            },
            catalogue: {
                type: Sequelize.STRING
            }
        });
        this.bookInfo.sync();
    }

    getInfoByISBN(isbn): Promise<Model[]> {
        return this.bookInfo.findAll({
            where: {
                ISBN: isbn
            }
        });
    }

    getInfoByTitle(title): Promise<Model[]> {
        return this.bookInfo.findAll({
            where: {
                title: title
            }
        });
    }

    getInfoByAuthor(author): Promise<Model[]> {
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

