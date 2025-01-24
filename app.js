import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/mongoConnection.js";
import { handleSaveCoinData } from "./controllers/controller.js";
import { Agenda } from "@hokify/agenda";

dotenv.config({ path: "./.env" });

const app = express();

// Connect to MongoDB
connectDB();

// Initialize Agenda
const agenda = new Agenda({
    db: {
        address: process.env.MONGO_URI,
        collection: "agendaJobs",
    },
});

// Agenda events
agenda.on("ready", () => {
    console.log("Agenda connected to MongoDB and ready!");
});

agenda.on("error", (error) => {
    console.error("Agenda encountered an error:", error.message);
});

// Define jobs
agenda.define("save coin data", async (job) => {
    console.log("Running 'save coin data' job...");
    try {
        await handleSaveCoinData();
        console.log("'Save coin data' job completed!");
    } catch (error) {
        console.error("Error in 'save coin data' job:", error.message);
    }
});

// Start Agenda and schedule jobs
(async () => {
    try {
        await agenda.start();
        console.log("Agenda started...");
        await agenda.every("2 minutes", "save coin data");
        console.log("Job scheduled to run every 2 minutes.");
    } catch (error) {
        console.error("Error initializing Agenda:", error.message);
    }
})();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

export default app;
