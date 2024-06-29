import { DataTypes, InferCreationAttributes, Model, Optional } from "sequelize";
import { sequelize } from "../db/db";
import { BillItem, BillItemAttributes } from "./BillItem";

export interface BillAttributes {
  id?: number;
  client: string;
  mobile: string;
  address: string;
  total: number;
}

interface BillCreationAttributes extends Optional<BillAttributes, "id"> {}

interface BillInstance
  extends Model<BillAttributes, BillCreationAttributes>,
    BillAttributes {
  createdAt?: Date;
  updatedAt?: Date;
}

export const Bill = sequelize.define<BillInstance>("Bill", {
  id: {
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
    unique: true,
  },
  client: {
    allowNull: false,
    type: DataTypes.TEXT,
  },
  mobile: {
    allowNull: false,
    type: DataTypes.TEXT,
  },
  address: {
    allowNull: false,
    type: DataTypes.TEXT,
  },
  total: {
    allowNull: false,
    type: DataTypes.FLOAT,
  },
});
