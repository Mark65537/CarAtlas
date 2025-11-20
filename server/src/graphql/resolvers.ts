import { Car } from "../models/Car";

type CarInput = { Model: string; Mark: string };

const MAX_LENGTH = 100;

const normalizeAndValidate = (input: CarInput) => {
  const Model = input.Model?.trim() ?? "";
  const Mark = input.Mark?.trim() ?? "";

  if (!Model) {
    throw new Error("Поле Model не может быть пустым");
  }
  if (!Mark) {
    throw new Error("Поле Mark не может быть пустым");
  }
  if (Model.length > MAX_LENGTH) {
    throw new Error(`Поле Model не может превышать ${MAX_LENGTH} символов`);
  }
  if (Mark.length > MAX_LENGTH) {
    throw new Error(`Поле Mark не может превышать ${MAX_LENGTH} символов`);
  }

  return { Model, Mark };
};

export const resolvers = {
  Query: {
    cars: async () => Car.findAll(),
    car: async (_: any, { id }: { id: number }) => Car.findByPk(id)
  },
  Mutation: {
    createCar: async (_: any, { input }: { input: CarInput }) => {
      const payload = normalizeAndValidate(input);
      const car = await Car.create(payload);
      return car;
    },
    updateCar: async (_: any, { id, input }: { id: number; input: CarInput }) => {
      const car = await Car.findByPk(id);
      if (!car) throw new Error("Автомобиль не найден");
      const payload = normalizeAndValidate(input);
      await car.update(payload);
      return car;
    },
    deleteCar: async (_: any, { id }: { id: number }) => {
      const car = await Car.destroy({ where: { Id_Car: id } });
      return !!car;
    }
  }
};
