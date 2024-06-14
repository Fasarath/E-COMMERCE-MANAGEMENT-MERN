import swaggerJsdoc from 'swagger-jsdoc';

const PORT = process.env.PORT || 5000

const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Style Hub API",
            version: "1.0.0",
            description: "API documentation for the Style Hub Cloths E-commerce application",
            contact: {
                name: "Style Hub",
                url: "http://localhost:5173",
            },
        },
        servers: [
            {
                url: `http://localhost:${PORT}`,
                description: 'Local server',
            },
        ],
    },
    apis: ["./routes/*.js"],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

export default swaggerDocs;
