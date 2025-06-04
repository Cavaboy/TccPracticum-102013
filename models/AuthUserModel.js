import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const AuthUser = db.define(
    "users",
    {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        username: {
            type: Sequelize.STRING,
            unique: true,
            allowNull: false,
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
        },
    }
);

export default AuthUser;
