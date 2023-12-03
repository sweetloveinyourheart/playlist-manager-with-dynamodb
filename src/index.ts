import express from 'express';
import * as bodyParser from 'body-parser'
import { initDynamodbConnection } from './database/connection';
import routes from './routes';
import { GlobalException } from './exceptions/global.exception';
import swaggerUi from 'swagger-ui-express'
import swaggerJSDoc from 'swagger-jsdoc'
import { swaggerOptions } from './configs/swagger.config'

const app = express();
const swaggerSpec = swaggerJSDoc(swaggerOptions);

// init dynamodb connection
initDynamodbConnection()

// middlewares
app.use(bodyParser.json())

// routes
app.use('/api/v1', routes)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// exception handling
app.use(GlobalException)

// listen
const port = process.env.PORT || 9000;
const swaggerAPILink = process.env.SWAGGER_API_LINK || `http://localhost:${port}/api-docs`

app.listen(port, () => {
  console.log("🚀 Server launch on port", port)
  console.log("🚀 Swagger document is available on", swaggerAPILink);
  
})