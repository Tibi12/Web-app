import { Inventory, InventoryAttributes } from "../models/Inventory";
import { User } from "../models/User";

export const fetchAllInventory = async (): Promise<any> => {
  const inventoryItems = await Inventory.findAll({
    raw: true,
    attributes: ["id", "brand", "model", "size", "stock", "price", "category"],
  });

  return inventoryItems;
};

export const addToInventory = async (
  item: InventoryAttributes
): Promise<any> => {
  const inventoryItem = await Inventory.create(item);

  return inventoryItem;
};

export const updateStock = async (
  inventoryId: number,
  stock: number
): Promise<boolean> => {
  const res = await Inventory.update(
    { stock: stock.toString() },
    { where: { id: inventoryId } }
  );

  return res[0] == 1
};
