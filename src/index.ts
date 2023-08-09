import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { TestResolver } from "./resolver/testResolver";

export type MyContext = {
  authScope?: String;
};

const start = async () => {
  const schema = await buildSchema({
    resolvers: [TestResolver],
  });
  const server = new ApolloServer<MyContext>({
    schema,
  });
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
    context: async ({ req }) => {
      return {
        authScope: req.headers.authorization,
      };
    },
  });

  console.log(`🚀  Server ready at: ${url}`);
};
start();
