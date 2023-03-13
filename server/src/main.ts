import './constants/env'

import { createServer } from 'http';
import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import { GraphQLInit } from './graphql';
import { expressMiddleware } from '@apollo/server/express4'

const PORT = process.env.PORT || 3000
const app = express()

const httpServer = createServer(app)

const server = GraphQLInit(httpServer)

app.use(cors(), bodyParser.json())

server.start().then(() => {
  app.use('/graphql', expressMiddleware(server))
})

httpServer.listen(PORT, () => {
  console.log(`Server is now running on http://localhost:${PORT}/`);
});
