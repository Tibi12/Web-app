"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Inventory = void 0;
const sequelize_1 = require("sequelize");
const db_1 = require("../db/db");
exports.Inventory = db_1.sequelize.define("Inventory", {
    id: {
        autoIncrement: true,
        primaryKey: true,
        type: sequelize_1.DataTypes.INTEGER,
        unique: true,
    },
    brand: {
        allowNull: false,
        type: sequelize_1.DataTypes.TEXT,
    },
    model: {
        allowNull: false,
        type: sequelize_1.DataTypes.TEXT,
    },
    size: {
        allowNull: false,
        type: sequelize_1.DataTypes.TEXT,
    },
    stock: {
        allowNull: false,
        type: sequelize_1.DataTypes.TEXT,
    },
    price: {
        allowNull: false,
        type: sequelize_1.DataTypes.TEXT,
    },
    category: {
        allowNull: false,
        type: sequelize_1.DataTypes.TEXT,
    },
});
