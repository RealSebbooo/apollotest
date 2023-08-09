import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import "reflect-metadata";
import {
  Arg,
  Field,
  ObjectType,
  Query,
  Resolver,
  buildSchema,
} from "type-graphql";

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.

@ObjectType()
class Recipe {
  @Field((type) => String)
  id: string;
}

@Resolver()
class Resolver1 {
  constructor() {}

  @Query((returns) => Recipe)
  async recipe(@Arg("id") id?: string) {
    console.log("id", id);

    return id;
  }
}
const books = [
  {
    title: "The Awakening",
    author: "Kate Chopin",
  },
  {
    title: "City of Glass",
    author: "Paul Auster",
  },
];

export type MyContext = {
  // You can optionally create a TS interface to set up types
  // for your contextValue
  authScope?: String;
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const schema = await buildSchema({ resolvers: [Resolver1] });
const server = new ApolloServer<MyContext>({
  schema,
});

// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req, res }) => {
    return {
      authScope: req.headers.authorization,
    };
  },
});

console.log(`🚀  Server ready at: ${url}`);
