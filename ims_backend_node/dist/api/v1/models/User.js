"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const sequelize_1 = require("sequelize");
const db_1 = require("../db/db");
exports.User = db_1.sequelize.define("User", {
    id: {
        autoIncrement: true,
        primaryKey: true,
        type: sequelize_1.DataTypes.INTEGER,
        unique: true,
    },
    name: {
        allowNull: true,
        type: sequelize_1.DataTypes.TEXT,
    },
    email: {
        allowNull: true,
        type: sequelize_1.DataTypes.TEXT,
    },
    password: {
        allowNull: false,
        type: sequelize_1.DataTypes.TEXT,
    },
});
