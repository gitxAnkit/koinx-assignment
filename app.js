import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/mongoConnection.js';
dotenv.config({ path: "./.env" });
const app = express();

// Connect Mongo DB
connectDB();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


export default app;