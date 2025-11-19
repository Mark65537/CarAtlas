import "reflect-metadata";
import { ApolloServer } from "apollo-server";
import { typeDefs } from "./graphql/schema";
import { resolvers } from "./graphql/resolvers";
import { sequelize } from "./db";
import { Car } from "./models/Car";

async function start() {
  await sequelize.sync(); // создаст таблицу при отсутствии
  // опционально seed
  const server = new ApolloServer({ typeDefs, resolvers });
  const { url } = await server.listen({ port: 4000 });
  console.log(`Server ready at ${url}`);
}
start();
