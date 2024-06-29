import { DataTypes, InferCreationAttributes, Model, Optional } from "sequelize";
import { sequelize } from "../db/db";
import { Bill } from "./Bill";
import { Inventory } from "./Inventory";

export interface BillItemAttributes {
  id?: number;
  billId: number;
  inventoryId: number;
  quantity: number;
  amount: number;
}

interface BillItemCreationAttributes extends Optional<BillItemAttributes, "id"> {}

interface BillItemInstance
  extends Model<BillItemAttributes, BillItemCreationAttributes>,
    BillItemAttributes {
  createdAt?: Date;
  updatedAt?: Date;
}

export const BillItem = sequelize.define<BillItemInstance>("BillItem", {
  id: {
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
    unique: true,
  },
  billId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: Bill,
      key: 'id'
    }
  },
  inventoryId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: Inventory,
      key: 'id'
    }
  },
  quantity: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  amount: {
    allowNull: false,
    type: DataTypes.FLOAT,
  },
});
