import * as Sequelize from "sequelize";

export class BorrowedRepo {
    private sql: any;
    borrowed: any;

    constructor(url) {
        this.sql = new Sequelize.Sequelize(url);
        this.borrowed = this.sql.define("borroweds", {
            bookID: {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true
            },
            userID: {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true
            },
            returnDate: {
                type: Sequelize.DATE
            }
        });
        this.borrowed.sync();
    }
}

