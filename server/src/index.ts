import "reflect-metadata";
import { ApolloServer } from "apollo-server";
import { gql } from "apollo-server";

// Минимальная схема для запуска сервера
const typeDefs = gql`
  type Query {
    _empty: String
  }
`;

const resolvers = {
  Query: {
    _empty: () => "Apollo Server запущен!"
  }
};

async function start() {
  const server = new ApolloServer({
    typeDefs,
    resolvers
  });
  
  const { url } = await server.listen({ port: 4000 });
  console.log(`Server ready at ${url}`);
}
start();
