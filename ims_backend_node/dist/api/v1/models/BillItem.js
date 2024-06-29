"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BillItem = void 0;
const sequelize_1 = require("sequelize");
const db_1 = require("../db/db");
const Bill_1 = require("./Bill");
const Inventory_1 = require("./Inventory");
exports.BillItem = db_1.sequelize.define("BillItem", {
    id: {
        autoIncrement: true,
        primaryKey: true,
        type: sequelize_1.DataTypes.INTEGER,
        unique: true,
    },
    billId: {
        allowNull: false,
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: Bill_1.Bill,
            key: 'id'
        }
    },
    inventoryId: {
        allowNull: false,
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: Inventory_1.Inventory,
            key: 'id'
        }
    },
    quantity: {
        allowNull: false,
        type: sequelize_1.DataTypes.INTEGER,
    },
    amount: {
        allowNull: false,
        type: sequelize_1.DataTypes.FLOAT,
    },
});
