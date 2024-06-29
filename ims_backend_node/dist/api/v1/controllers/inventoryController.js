"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateStockController = exports.addToInventoryController = exports.inventoryFetchAllInventoryController = void 0;
const InventoryService_1 = require("../services/InventoryService");
const inventoryFetchAllInventoryController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const inventoryItems = yield (0, InventoryService_1.fetchAllInventory)();
        res.status(200).json(inventoryItems);
    }
    catch (err) {
        console.log(err);
        const response = {
            status: "failed",
            message: "internal error",
        };
        res.status(500).json(response);
    }
});
exports.inventoryFetchAllInventoryController = inventoryFetchAllInventoryController;
const addToInventoryController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { brand, model, size, stock, price, category } = req.body;
        if (!brand || !model || !size || !stock || !price) {
            const response = {
                status: "failed",
                message: "Invalid request",
            };
            res.status(400).json(response);
            return;
        }
        const inventoryItem = yield (0, InventoryService_1.addToInventory)({
            brand,
            model,
            size,
            stock,
            price,
            category: "null",
        });
        const response = {
            status: "success",
            message: "Created successfully",
            data: inventoryItem,
        };
        res.status(200).json(response);
    }
    catch (err) {
        console.log(err);
        const response = {
            status: "failed",
            message: "internal error",
        };
        res.status(500).json(response);
    }
});
exports.addToInventoryController = addToInventoryController;
const updateStockController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { stock, id } = req.body;
        stock = Number(stock);
        if (!id || !stock || isNaN(stock)) {
            const response = {
                status: "failed",
                message: "Invalid request",
            };
            res.status(400).json(response);
            return;
        }
        const updateFlag = yield (0, InventoryService_1.updateStock)(id, stock);
        if (!updateFlag) {
            const response = {
                status: "failed",
                message: "failed to update",
            };
            res.status(500).json(response);
            return;
        }
        const response = {
            status: "success",
            message: "updated successfully",
        };
        res.status(200).json(response);
    }
    catch (err) {
        console.log(err);
        const response = {
            status: "failed",
            message: "internal error",
        };
        res.status(500).json(response);
    }
});
exports.updateStockController = updateStockController;
