import { DataTypes, Model } from "sequelize";
import { sequelize } from "../db";

export class Car extends Model {
  public Id_Car!: number;
  public Model!: string;
  public Mark!: string;
}
Car.init({
  Id_Car: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  Model: { type: DataTypes.STRING, allowNull: false },
  Mark: { type: DataTypes.STRING, allowNull: false }
}, { sequelize, tableName: "Cars", timestamps: false });
