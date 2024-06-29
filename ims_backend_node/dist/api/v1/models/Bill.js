"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bill = void 0;
const sequelize_1 = require("sequelize");
const db_1 = require("../db/db");
exports.Bill = db_1.sequelize.define("Bill", {
    id: {
        autoIncrement: true,
        primaryKey: true,
        type: sequelize_1.DataTypes.INTEGER,
        unique: true,
    },
    client: {
        allowNull: false,
        type: sequelize_1.DataTypes.TEXT,
    },
    mobile: {
        allowNull: false,
        type: sequelize_1.DataTypes.TEXT,
    },
    address: {
        allowNull: false,
        type: sequelize_1.DataTypes.TEXT,
    },
    total: {
        allowNull: false,
        type: sequelize_1.DataTypes.FLOAT,
    },
});
