import { Options } from 'swagger-jsdoc'

export const swaggerOptions: Options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Playlist Manager Express API with Swagger",
            version: "0.1.0",
            description: "This is a simple CRUD API application made with Express and documented with Swagger"
        },
        components: {
            securitySchemes: {
                BearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT"
                }
            }
        },
        servers: [
            {
                url: '/api/v1', // Set your desired base path here
                description: 'Playlist API version 1.0',
            },
        ],
    },
    apis: ['./**/*.ts'], // for dev mode
    // apis: ['./**/*.js'], // for build
};