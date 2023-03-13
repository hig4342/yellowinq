import { readFileSync } from 'fs';
import { Server } from 'http';
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';
import { ApolloServer } from '@apollo/server';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';

import { makeExecutableSchema } from '@graphql-tools/schema';
import { Resolvers } from './resolvers-types';

const typeDefs = readFileSync('./schema.graphql', 'utf8')

const books = [
  {
    title: "test1",
    author: "person1"
  },
  {
    title: "test2",
    author: "person2"
  },
]

const resolvers: Resolvers = {
  Query: {
    books: () => books
  },
};

export function GraphQLInit(httpServer: Server) {
  const schema = makeExecutableSchema({ typeDefs, resolvers });
  
  const wsServer = new WebSocketServer({
    server: httpServer,
    path: '/graphql',
  });
  const serverCleanup = useServer({ schema }, wsServer)

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

  return server
}