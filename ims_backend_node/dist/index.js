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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const router_1 = require("./api/v1/routes/router");
const db_1 = require("./api/v1/db/db");
const BillItem_1 = require("./api/v1/models/BillItem");
//configure env variables
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
//middlewares
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: "*",
}));
app.use("/users", router_1.userRouter);
app.use("/inventories", router_1.inventoryRouter);
app.use("/bills", router_1.billRouter);
app.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // await Bill.sync({ force: true }) // Use with caution, drops existing tables
    //   .then(() => {
    //     console.log("Table created successfully!");
    //   })
    //   .catch((error: any) => {
    //     console.error("Error creating table:", error);
    //   });
    // await BillItem.sync({ force: true }) // Use with caution, drops existing tables
    //   .then(() => {
    //     console.log("Table created successfully!");
    //   })
    //   .catch((error: any) => {
    //     console.error("Error creating table:", error);
    //   });
    // const invData: InventoryAttributes[] = [
    //   {
    //     brand: "Michelin",
    //     model: "Pilot Sport 4S",
    //     size: "225/45R17",
    //     stock: "10",
    //     price: "250.00",
    //     category: "Performance",
    //   },
    //   {
    //     brand: "Continental",
    //     model: "CrossContact LX Sport",
    //     size: "235/55R18",
    //     stock: "15",
    //     price: "180.00",
    //     category: "All-Season",
    //   },
    //   {
    //     brand: "Bridgestone",
    //     model: "Dueler H/L Alenza",
    //     size: "215/65R16",
    //     stock: "5",
    //     price: "200.50",
    //     category: "SUV/Truck",
    //   },
    //   {
    //     brand: "Goodyear",
    //     model: "Eagle Touring",
    //     size: "195/60R15",
    //     stock: "8",
    //     price: "125.99",
    //     category: "Passenger",
    //   },
    //   {
    //     price: "350.75",
    //     brand: "Pirelli",
    //     model: "P Zero PZ4",
    //     size: "245/40R19",
    //     stock: "3",
    //     category: "Ultra High Performance",
    //   },
    // ];
    // const i = await Inventory.bulkCreate(invData)
    //   .then((i: any) => {
    //     return i;
    //   })
    //   .catch((error: any) => {
    //     console.error("Error creating user:", error);
    //   });
    // await Bill.create({address: "asdf", client: "asdf", mobile: "asf", total: 88.88})
    yield BillItem_1.BillItem.create({
        billId: 1,
        amount: 8, quantity: 8, inventoryId: 1
    });
    res.status(200).json({ data: "i" });
}));
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Something broke!");
});
app.listen(PORT, () => {
    console.log(`⚡️ [server]: Server is running at http://localhost:${PORT}`);
    (0, db_1.dbConnection)();
});
