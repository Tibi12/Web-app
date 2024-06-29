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
exports.fetchBillController = exports.fetchAllBillsController = exports.generateBillController = exports.addToInventoryController = exports.inventoryFetchAllInventoryController = void 0;
const InventoryService_1 = require("../services/InventoryService");
const BillService_1 = require("../services/BillService");
const inventoryFetchAllInventoryController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const inventoryItems = yield (0, InventoryService_1.fetchAllInventory)();
        const response = {
            status: "success",
            message: "Fetched successfully",
            data: inventoryItems,
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
exports.inventoryFetchAllInventoryController = inventoryFetchAllInventoryController;
const addToInventoryController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { brand, model, size, stock, price, category } = req.body;
        console.log(category);
        if (!brand || !model || !size || !stock || !price || !category) {
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
            category,
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
const generateBillController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const inventoryItem = yield (0, BillService_1.generateBill)(req.body);
        const response = {
            status: "success",
            message: "Bill generated successfully",
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
exports.generateBillController = generateBillController;
const fetchAllBillsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bills = yield (0, BillService_1.fetchAllBillsService)();
        res.status(200).json(bills);
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
exports.fetchAllBillsController = fetchAllBillsController;
const fetchBillController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const billId = req.params.billId;
        if (!billId) {
            const response = {
                status: "failed",
                message: "Invalid request",
            };
            res.status(400).json(response);
            return;
        }
        const bill = yield (0, BillService_1.fetchBillService)(Number(billId));
        res.status(200).json(bill);
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
exports.fetchBillController = fetchBillController;
