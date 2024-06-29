import { Request, Response } from "express";
import { IResponse } from "../Interfaces/IResponse";
import {
  addToInventory,
  fetchAllInventory,
  updateStock,
} from "../services/InventoryService";
import { InventoryAttributes } from "../models/Inventory";

export const inventoryFetchAllInventoryController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const inventoryItems = await fetchAllInventory();
    res.status(200).json(inventoryItems);
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
    const { brand, model, size, stock, price, category } =
      req.body;

    if (!brand || !model || !size || !stock || !price) {
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
      category: "null",
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

export const updateStockController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    let { stock, id } = req.body;
    stock = Number(stock);

    if (!id || !stock || isNaN(stock)) {
      const response: IResponse = {
        status: "failed",
        message: "Invalid request",
      };
      res.status(400).json(response);
      return;
    }

    const updateFlag = await updateStock(id, stock);
    if (!updateFlag) {
      const response: IResponse = {
        status: "failed",
        message: "failed to update",
      };
  
      res.status(500).json(response);
      return
    }

    const response: IResponse = {
      status: "success",
      message: "updated successfully",
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
