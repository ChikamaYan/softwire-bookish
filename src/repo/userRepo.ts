import {Sequelize, Model, DataTypes, BuildOptions} from 'sequelize';
import {Borrowed} from "./borrowedRepo";
import {BookInfo} from "./bookInfoRepo";

export interface User extends Model {
    readonly userID: number,
    readonly username: string
};

type UserStatic = typeof Model & {
    new(values?: object, options?: BuildOptions): User;
}

export class UserRepo {
    private sql: any;
    user: any;

    constructor(url) {
        this.sql = new Sequelize(url);
        this.user = <User>this.sql.define("users", {
            userID: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true
            },
            username: {
                type: DataTypes.STRING
            }
        });
        this.user.sync();
    }

    getUserByUsername(username): Promise<User> {
        return this.user.findOne({
            where: {
                username: username
            }
        });
    }
}

