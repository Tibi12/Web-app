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
exports.updateStock = exports.addToInventory = exports.fetchAllInventory = void 0;
const Inventory_1 = require("../models/Inventory");
const fetchAllInventory = () => __awaiter(void 0, void 0, void 0, function* () {
    const inventoryItems = yield Inventory_1.Inventory.findAll({
        raw: true,
        attributes: ["id", "brand", "model", "size", "stock", "price", "category"],
    });
    return inventoryItems;
});
exports.fetchAllInventory = fetchAllInventory;
const addToInventory = (item) => __awaiter(void 0, void 0, void 0, function* () {
    const inventoryItem = yield Inventory_1.Inventory.create(item);
    return inventoryItem;
});
exports.addToInventory = addToInventory;
const updateStock = (inventoryId, stock) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield Inventory_1.Inventory.update({ stock: stock.toString() }, { where: { id: inventoryId } });
    return res[0] == 1;
});
exports.updateStock = updateStock;
