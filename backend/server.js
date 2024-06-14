import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import dressRouter from "./routes/dressRoute.js";
import userRouter from "./routes/userRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import swaggerUi from "swagger-ui-express";
import swaggerDocs from "./config/swagger.js";
import dotenv from "dotenv";
import path from "path";
import errorMiddleware from "./middleware/error.js";
import { fileURLToPath } from 'url';


// Initialize dotenv
// Convert the current file's URL to a file path
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Load environment variables from .env file
dotenv.config({ path: path.resolve(__dirname, 'config/config.env') });

const PORT = process.env.PORT || 5000

// app config
const app = express();

// middleware
app.use(express.json());
app.use(cors());

// db connection
connectDB();

// api endpoint
app.use("/api/dress", dressRouter);
app.use("/images", express.static('uploads'));
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

// swagger ui connection
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// error handler
app.use(errorMiddleware);


const server = app.listen(PORT, () => {
    console.log(`Server is working on http://localhost:${PORT}/api-docs`);
});

// unhandled Rejection Error
process.on('unhandledRejection', (err) => {
    
    const stackLines = err.stack.split('\n');
    const errorLocation = stackLines[1].trim();

    console.error(`Unhandled Rejection: ${err.message}`);
    console.error(`Occurred in: ${errorLocation}`);
    console.log('Shutting down the server due to unhandled rejection error');
    server.close(() => { process.exit(1) });
});

// uncaught Exception Error
process.on('uncaughtException', (err) => {

    const stackLines = err.stack.split('\n');
    const errorLocation = stackLines[1].trim();

    console.error(`Uncaught Exception: ${err.message}`);
    console.error(`Occurred in: ${errorLocation}`);
    console.log('Shutting down the server due to uncaught exception error');
    server.close(() => { process.exit(1) });
});
