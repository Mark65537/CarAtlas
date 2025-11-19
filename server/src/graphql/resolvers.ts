import { Car } from "../models/Car";

export const resolvers = {
  Query: {
    cars: async () => Car.findAll(),
    car: async (_: any, { id }: { id: number }) => Car.findByPk(id)
  },
  Mutation: {
    createCar: async (_: any, { input }: any) => {
      const car = await Car.create(input);
      return car;
    },
    updateCar: async (_: any, { id, input }: any) => {
      const car = await Car.findByPk(id);
      if (!car) throw new Error("Not found");
      await car.update(input);
      return car;
    },
    deleteCar: async (_: any, { id }: any) => {
      const car = await Car.destroy({ where: { Id_Car: id } });
      return !!car;
    }
  }
};
