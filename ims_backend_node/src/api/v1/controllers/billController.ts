import { Request, Response } from "express";
import { IResponse } from "../Interfaces/IResponse";
import {
  addToInventory,
  fetchAllInventory,
  updateStock,
} from "../services/InventoryService";
import { InventoryAttributes } from "../models/Inventory";
import { fetchAllBillsService, fetchBillService, generateBill } from "../services/BillService";

export const inventoryFetchAllInventoryController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const inventoryItems = await fetchAllInventory();

    const response: IResponse = {
      status: "success",
      message: "Fetched successfully",
      data: inventoryItems,
    };

    res.status(200).json(response);
  } catch (err) {
    console.log(err);

    const response: IResponse = {
      status: "failed",
      message: "internal error",
    };

    res.status(500).json(response);
  }
};

export const addToInventoryController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { brand, model, size, stock, price, category } = req.body;

    console.log(category);
    if (!brand || !model || !size || !stock || !price || !category) {
      const response: IResponse = {
        status: "failed",
        message: "Invalid request",
      };
      res.status(400).json(response);
      return;
    }

    const inventoryItem = await addToInventory({
      brand,
      model,
      size,
      stock,
      price,
      category,
    });

    const response: IResponse = {
      status: "success",
      message: "Created successfully",
      data: inventoryItem,
    };

    res.status(200).json(response);
  } catch (err) {
    console.log(err);

    const response: IResponse = {
      status: "failed",
      message: "internal error",
    };

    res.status(500).json(response);
  }
};

export const generateBillController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const inventoryItem = await generateBill(req.body);

    const response: IResponse = {
      status: "success",
      message: "Bill generated successfully",
    };

    res.status(200).json(response);
  } catch (err) {
    console.log(err);

    const response: IResponse = {
      status: "failed",
      message: "internal error",
    };

    res.status(500).json(response);
  }
};
export const fetchAllBillsController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const bills = await fetchAllBillsService();

    res.status(200).json(bills);
  } catch (err) {
    console.log(err);

    const response: IResponse = {
      status: "failed",
      message: "internal error",
    };

    res.status(500).json(response);
  }
};
export const fetchBillController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const billId = req.params.billId

    if (!billId) {
      const response: IResponse = {
        status: "failed",
        message: "Invalid request",
      };
      res.status(400).json(response);
      return;
    }

    const bill = await fetchBillService(Number(billId));

    res.status(200).json(bill);
  } catch (err) {
    console.log(err);

    const response: IResponse = {
      status: "failed",
      message: "internal error",
    };

    res.status(500).json(response);
  }
};
