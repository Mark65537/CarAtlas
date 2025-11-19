import { gql } from "apollo-server";
export const typeDefs = gql`
  type Car {
    Id_Car: Int!
    Model: String!
    Mark: String!
  }
  input CarInput { Model: String!, Mark: String! }
  type Query {
    cars: [Car!]!
    car(id: Int!): Car
  }
  type Mutation {
    createCar(input: CarInput!): Car!
    updateCar(id: Int!, input: CarInput!): Car!
    deleteCar(id: Int!): Boolean!
  }
`;
