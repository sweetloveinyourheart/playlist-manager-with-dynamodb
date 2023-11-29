import express, { Request, Response } from 'express';
import { initDynamodbConnection } from './database/connection';

const app = express();

// init dynamodb connection
initDynamodbConnection()

// routes
app.get('/', (req: Request, res: Response) => {
    res.send('Hello, TypeScript Express!');
  });

// listen
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log("🚀 Server launch on port", port)
})