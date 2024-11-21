import { ApolloServer } from "@apollo/server";
import { User } from "./user";
import { Post } from "./post";

export default async function ApolloGQLServer() {
  const gqlServer = new ApolloServer({
    typeDefs: `#graphql
    type Query {
      ${User.queries}
      ${Post.queries}
    }
    type Mutation {
      ${User.mutations}
      ${Post.mutations}
    }
    `, // Schema Definition
    resolvers: {
      Query: { ...User.resolvers.queries, ...Post.resolvers.queries },
      Mutation: { ...User.resolvers.mutations, ...Post.resolvers.mutations },
    },
  });

  await gqlServer.start();
  return gqlServer;
}
