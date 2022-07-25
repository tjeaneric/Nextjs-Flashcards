import { makeSchema, queryType } from "nexus";
import { ApolloServer } from "apollo-server-micro";
import { PageConfig } from "next";
import Cors from "micro-cors";

const cors = Cors();

const Query = queryType({
  definition(t) {
    t.string("hello", { resolve: () => "hello Flashcards!" });
  },
});

const schema = makeSchema({
  types: [Query],
});

const server = new ApolloServer({
  schema,
});

export const config: PageConfig = {
  api: {
    bodyParser: false,
  },
};

const startServer = server.start();

export default cors(async (req, res) => {
  if (req.method === "OPTIONS") {
    res.end();
    return false;
  }

  await startServer;
  await server.createHandler({ path: "/api/graphql" })(req, res);
});
