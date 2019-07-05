import {Sequelize, Model, DataTypes, BuildOptions} from 'sequelize';
import * as moment from "moment";
import _date = moment.unitOfTime._date;
import {BookType} from "./bookRepo";

export interface Borrowed extends Model {
    readonly bookID: number,
    readonly userID: number,
    readonly returnDate: string
}

type BorrowedStatic = typeof Model &{
    new (values?: object, options?: BuildOptions): Borrowed;
}

export class BorrowedRepo {
    private sql: any;
    borrowed: any;

    constructor(url) {
        this.sql = new Sequelize(url);
        this.borrowed = <BorrowedStatic>this.sql.define("borroweds", {
            bookID: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true
            },
            userID: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true
            },
            returnDate: {
                type: DataTypes.DATE
            }
        });
        this.borrowed.sync();
    }

    getBorrowedByUserID(userID): Promise<Borrowed[]> {
        return this.borrowed.findAll({
            where: {
                userID: userID
            }
        });
    }
}

