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
exports.fetchBillService = exports.fetchAllBillsService = exports.generateBill = void 0;
const Bill_1 = require("../models/Bill");
const BillItem_1 = require("../models/BillItem");
const Inventory_1 = require("../models/Inventory");
const generateBill = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { client, mobile, address } = payload;
    console.log(payload);
    let total = 0;
    payload.items = yield Promise.all(payload.items.map((e) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const inventoryId = e.id;
        const quantity = e.quantity;
        const inventory = (_a = (yield Inventory_1.Inventory.findOne({ where: { id: inventoryId } }))) === null || _a === void 0 ? void 0 : _a.toJSON();
        if (inventory) {
            total = total + Number(inventory.price) * Number(quantity);
            e.amount = quantity * Number(inventory.price);
        }
        return e;
    })));
    const inventoryItem = (yield Bill_1.Bill.create({ client, mobile, address, total })).toJSON();
    yield Promise.all(payload.items.map((e) => __awaiter(void 0, void 0, void 0, function* () {
        const billItem = yield BillItem_1.BillItem.create({
            billId: Number(inventoryItem.id),
            inventoryId: e.id,
            quantity: e.quantity,
            amount: e.amount,
        });
    })));
});
exports.generateBill = generateBill;
const fetchAllBillsService = () => __awaiter(void 0, void 0, void 0, function* () {
    let bills = yield Bill_1.Bill.findAll({ raw: true });
    bills = yield Promise.all(bills.map((bill) => __awaiter(void 0, void 0, void 0, function* () {
        let billItems = yield BillItem_1.BillItem.findAll({ where: { billId: bill.id }, raw: true });
        console.log(billItems);
        billItems = yield Promise.all(billItems.map((e) => __awaiter(void 0, void 0, void 0, function* () {
            const inventoryItem = yield Inventory_1.Inventory.findOne({ where: { id: e.inventoryId }, raw: true });
            e.brand = inventoryItem === null || inventoryItem === void 0 ? void 0 : inventoryItem.brand,
                e.model = inventoryItem === null || inventoryItem === void 0 ? void 0 : inventoryItem.model,
                e.size = inventoryItem === null || inventoryItem === void 0 ? void 0 : inventoryItem.size,
                e.price = inventoryItem === null || inventoryItem === void 0 ? void 0 : inventoryItem.price;
            return e;
        })));
        bill.billItems = billItems;
        bill.count = billItems.length;
        console.log(bill);
        return bill;
    })));
    return bills;
});
exports.fetchAllBillsService = fetchAllBillsService;
const fetchBillService = (billId) => __awaiter(void 0, void 0, void 0, function* () {
    let bill = yield Bill_1.Bill.findOne({ where: { id: billId }, raw: true });
    let billItems = yield BillItem_1.BillItem.findAll({ where: { billId }, raw: true });
    billItems = yield Promise.all(billItems.map((e) => __awaiter(void 0, void 0, void 0, function* () {
        const inventoryItem = yield Inventory_1.Inventory.findOne({ where: { id: e.inventoryId }, raw: true });
        const newInventoryItem = {
            id: inventoryItem === null || inventoryItem === void 0 ? void 0 : inventoryItem.id,
            brand: inventoryItem === null || inventoryItem === void 0 ? void 0 : inventoryItem.brand,
            model: inventoryItem === null || inventoryItem === void 0 ? void 0 : inventoryItem.model,
            size: inventoryItem === null || inventoryItem === void 0 ? void 0 : inventoryItem.size,
            price: inventoryItem === null || inventoryItem === void 0 ? void 0 : inventoryItem.price
        };
        e.inventoryItem = newInventoryItem;
        return e;
    })));
    bill.billItems = billItems;
    return bill;
});
exports.fetchBillService = fetchBillService;
