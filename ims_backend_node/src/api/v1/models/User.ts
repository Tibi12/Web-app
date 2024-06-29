import { DataTypes, InferCreationAttributes, Model, Optional } from "sequelize";
import { sequelize } from "../db/db";

export interface UserAttributes {
  id?: number;
  name: string;
  email: string;
  password: string;
}

interface UserCreationAttributes extends Optional<UserAttributes, "id"> {}

interface UserInstance
  extends Model<UserAttributes, UserCreationAttributes>,
    UserAttributes {
  createdAt?: Date;
  updatedAt?: Date;
}

export const User = sequelize.define<UserInstance>("User", {
  id: {
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
    unique: true,
  },
  name: {
    allowNull: true,
    type: DataTypes.TEXT,
  },
  email: {
    allowNull: true,
    type: DataTypes.TEXT,
  },
  password: {
    allowNull: false,
    type: DataTypes.TEXT,
  },
});
