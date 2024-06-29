import { model } from "mongoose";
import { Bill, BillAttributes } from "../models/Bill";
import { BillItem } from "../models/BillItem";
import { Inventory } from "../models/Inventory";

type BillPayload = {
  client: string;
  mobile: string;
  address: string;
  items: { id: number; quantity: number; amount: number }[];
};

export const generateBill = async (payload: BillPayload): Promise<any> => {
  const { client, mobile, address } = payload;
  console.log(payload)
  let total = 0;
  payload.items = await Promise.all(
    payload.items.map(async (e) => {
      const inventoryId = e.id;
      const quantity = e.quantity;
      const inventory = (
        await Inventory.findOne({ where: { id: inventoryId } })
      )?.toJSON();

      if (inventory) {
        total = total + Number(inventory.price) * Number(quantity);
        e.amount = quantity * Number(inventory.price);
      }
      return e;
    })
  );

  const inventoryItem = (
    await Bill.create({ client, mobile, address, total })
  ).toJSON();
  await Promise.all(
    payload.items.map(async (e) => {
      const billItem = await BillItem.create({
        billId: Number(inventoryItem.id),
        inventoryId: e.id,
        quantity: e.quantity,
        amount: e.amount,
      });
    })
  );
};

export const fetchAllBillsService = async () => {
  let bills = await Bill.findAll({ raw: true });
  bills = await Promise.all(
      bills.map(async (bill: any) => {
          let billItems = await BillItem.findAll({ where: { billId: bill.id }, raw: true });
          console.log(billItems)

          billItems = await Promise.all(
            billItems.map(async (e: any) => {
                const inventoryItem = await Inventory.findOne({where: {id: e.inventoryId}, raw: true})
                
                e.brand = inventoryItem?.brand,
                e.model = inventoryItem?.model,
                e.size = inventoryItem?.size,
                e.price = inventoryItem?.price
                return e;
            })
          )

          bill.billItems = billItems
          bill.count = billItems.length
          console.log(bill)
          return bill;
    })
  );

  return bills
};  

export const fetchBillService = async (billId: number) => {
    let bill = await Bill.findOne({ where: {id: billId}, raw: true }) as any;
    let billItems = await BillItem.findAll({ where: { billId }, raw: true });

    billItems = await Promise.all(
        billItems.map(async (e: any) => {
            const inventoryItem = await Inventory.findOne({where: {id: e.inventoryId}, raw: true})
            const newInventoryItem = {
                id: inventoryItem?.id,
                brand: inventoryItem?.brand,
                model: inventoryItem?.model,
                size: inventoryItem?.size,
                price: inventoryItem?.price
            }
            e.inventoryItem = newInventoryItem
            return e;
        })
    )

    bill.billItems = billItems
    
    return bill
}