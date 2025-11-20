import { DataTypes, Model } from "sequelize";
import { sequelize } from "../db";

export class Car extends Model {
  public Id_Car!: number;
  public Model!: string;
  public Mark!: string;
}
Car.init({
  Id_Car: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  Model: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: { msg: "Model не может быть пустой" },
      len: { args: [1, 100], msg: "Model не должна превышать 100 символов" }
    },
    set(value: string) {
      this.setDataValue("Model", value?.trim());
    }
  },
  Mark: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: { msg: "Mark не может быть пустой" },
      len: { args: [1, 100], msg: "Mark не должна превышать 100 символов" }
    },
    set(value: string) {
      this.setDataValue("Mark", value?.trim());
    }
  }
}, { sequelize, tableName: "Cars", timestamps: false });
