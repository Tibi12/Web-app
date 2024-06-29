import express, { Express, NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { billRouter, inventoryRouter, userRouter } from "./api/v1/routes/router";
import { dbConnection } from "./api/v1/db/db";
import { User, UserAttributes } from "./api/v1/models/User";
import { fetchUser } from "./api/v1/services/UserService";
import { Inventory, InventoryAttributes } from "./api/v1/models/Inventory";
import { Bill } from "./api/v1/models/Bill";
import { BillItem } from "./api/v1/models/BillItem";

//configure env variables
dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 3000;

//middlewares
app.use(express.json());

app.use(
  cors({
    origin: "*",
  })
);

app.use("/users", userRouter);
app.use("/inventories", inventoryRouter);
app.use("/bills", billRouter);

app.get("/", async (req, res) => {
  
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
  await BillItem.create({
  billId: 1,
  amount: 8,quantity: 8,inventoryId: 1
  })
  res.status(200).json({ data: "i" });
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(PORT, () => {
  console.log(`⚡️ [server]: Server is running at http://localhost:${PORT}`);
  dbConnection();
});
