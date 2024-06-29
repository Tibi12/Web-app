import { DataTypes, InferCreationAttributes, Model, Optional } from "sequelize";
import { sequelize } from "../db/db";

export interface InventoryAttributes {
  id?: number;
  brand: string;
  model: string;
  size: string;
  stock: string;
  price: string;
  category: string;
}

interface InventoryCreationAttributes extends Optional<InventoryAttributes, "id"> {}

interface InventoryInstance
  extends Model<InventoryAttributes, InventoryCreationAttributes>,
    InventoryAttributes {
  createdAt?: Date;
  updatedAt?: Date;
}

export const Inventory = sequelize.define<InventoryInstance>("Inventory", {
  id: {
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
    unique: true,
  },
  brand: {
    allowNull: false,
    type: DataTypes.TEXT,
  },
  model: {
    allowNull: false,
    type: DataTypes.TEXT,
  },
  size: {
    allowNull: false,
    type: DataTypes.TEXT,
  },
  stock: {
    allowNull: false,
    type: DataTypes.TEXT,
  },
  price: {
    allowNull: false,
    type: DataTypes.TEXT,
  },
  category: {
    allowNull: false,
    type: DataTypes.TEXT,
  },
});
