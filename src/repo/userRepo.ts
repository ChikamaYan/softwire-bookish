import * as Sequelize from "sequelize";

export class UserRepo {
    private sql: any;
    user: any;

    constructor(url) {
        this.sql = new Sequelize.Sequelize(url);
        this.user = this.sql.define("users", {
            userID: {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true
            },
            username: {
                type: Sequelize.STRING
            }
        });
        this.user.sync();
    }
}

