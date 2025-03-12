import { Sequelize } from "sequelize";

// Nyambungin db ke BE
const db = new Sequelize("tcc-2", "root", "password", {
  host: "34.42.123.106",
  dialect: "mysql",
});

export default db;
