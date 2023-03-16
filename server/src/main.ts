import './constants/env'

import express from 'express'
import { createYoga } from 'graphql-yoga'
import { schema } from './graphql'
import cors from 'cors'
import bodyParser from 'body-parser'

const PORT = process.env.PORT || 3000
const app = express()
const yoga = createYoga({schema})

app.use(cors(), bodyParser.json())
app.use('/graphql', yoga)

app.listen(PORT, () => {
  console.log(`Server is now running on http://localhost:${PORT}/`);
});
