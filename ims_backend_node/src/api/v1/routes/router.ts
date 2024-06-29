import express from "express";
import { userAuthenticateController } from "../controllers/userController";
import { addToInventoryController, inventoryFetchAllInventoryController } from "../controllers/inventoryController";
import { updateStockController } from "../controllers/inventoryController";
import { fetchAllBillsController, fetchBillController, generateBillController } from "../controllers/billController";

export const userRouter = express.Router();
export const inventoryRouter = express.Router();
export const billRouter = express.Router();

userRouter.post("/login", userAuthenticateController);

inventoryRouter.get("/", inventoryFetchAllInventoryController)
inventoryRouter.post("/", addToInventoryController)
inventoryRouter.post("/update-stock", updateStockController)

billRouter.post("/generate-bill", generateBillController)
billRouter.get("/fetch-bills", fetchAllBillsController)
billRouter.get("/fetch-bills/:billId", fetchBillController)