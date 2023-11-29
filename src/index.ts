import express, { Request, Response } from 'express';

const app = express();

app.get('/', (req: Request, res: Response) => {
    res.send('Hello, TypeScript Express!');
  });

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log("🚀 Server launch on port", port)
})