import express from 'express';
import * as bodyParser from 'body-parser'
import { initDynamodbConnection } from './database/connection';
import routes from './routes';

const app = express();

// init dynamodb connection
initDynamodbConnection()

// middlewares
app.use(bodyParser.json())

// routes
app.use('/api/v1', routes)

// listen
const port = process.env.PORT || 9000;
app.listen(port, () => {
  console.log("🚀 Server launch on port", port)
})