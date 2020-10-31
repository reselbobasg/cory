import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import depthLimit from 'graphql-depth-limit';
import { createServer } from 'http';
import compression from 'compression';
import cors from 'cors';
import schema from './src/graphql/schema';


//intialize the db
//const database = new Database();

const app = express();
const server = new ApolloServer({
  schema,
  validationRules: [depthLimit(7)],
});
app.use('*', cors());
app.use(compression());
server.applyMiddleware({ app, path: '/graphql' });

export const httpServer = createServer(app);
httpServer.listen(
  { port: 3000 },
  (): void => console.log(`\n🚀      GraphQL is now running on http://localhost:3000/graphql`)
);

export const stopServer = async () => {
  await httpServer.close();
  console.log(`GraphQL Server closed at ${new Date()}`);
};