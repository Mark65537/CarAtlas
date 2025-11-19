import "reflect-metadata";
import { ApolloServer } from "apollo-server";

async function start() {
  // опционально seed
  const server = new ApolloServer({ typeDefs, resolvers });
  const { url } = await server.listen({ port: 4000 });
  console.log(`Server ready at ${url}`);
}
start();
