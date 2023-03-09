import { readFileSync } from 'fs';

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

export const schema = makeExecutableSchema({ typeDefs, resolvers });