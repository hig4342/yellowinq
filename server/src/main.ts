import { createServer } from 'http';
import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';
import { schema } from './constants/gql';

const PORT = process.env.PORT || 3000
const app = express()

const httpServer = createServer(app)
const wsServer = new WebSocketServer({
  server: httpServer,
  path: '/graphql',
});

const serverCleanup = useServer({ schema }, wsServer);

const server = new ApolloServer({
  schema,
  plugins: [
    ApolloServerPluginDrainHttpServer({ httpServer }),
    {
      async serverWillStart() {
        return {
          async drainServer() {
            await serverCleanup.dispose();
          },
        };
      },
    },
  ],
});

app.use(cors(), bodyParser.json())

server.start().then(() => {
  app.use('/graphql', expressMiddleware(server))
})

httpServer.listen(PORT, () => {
  console.log(`Server is now running on http://localhost:${PORT}/`);
});