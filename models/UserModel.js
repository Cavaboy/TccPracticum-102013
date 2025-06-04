import { Sequelize } from "sequelize";
import db from "../config/Database.js";

// Membuat tabel "notes"
const User = db.define(
  "notes", // Nama Tabel
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: Sequelize.STRING,
    content: Sequelize.STRING,
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
  }
);

// Remove db.sync() from here to avoid syncing on import

export default User;
