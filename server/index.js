import { ApolloServer } from "apollo-server";
import { ApolloServerPluginLandingPageLocalDefault } from "apollo-server-core";
import connectDatabase from "./config/mongoDb.js";
import mongoDataMethods from "./routers/user.js";
import typeDefs from "./schema/schema.js";
import resolvers from "./resolver/resolver.js";

connectDatabase();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: () => ({ mongoDataMethods }),
  plugins: [ApolloServerPluginLandingPageLocalDefault({ embed: true })],
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
