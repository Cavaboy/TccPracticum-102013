import { Sequelize } from "sequelize";
import db from "../config/Database.js";

// Membuat tabel "notes"
const User = db.define(
  "notes", // Nama Tabel
  {
    title: Sequelize.STRING,
    content: Sequelize.STRING,
  }
);

db.sync().then(() => console.log("Database synced"));

export default User;
