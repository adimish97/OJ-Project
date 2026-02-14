import express from "express";
import cors from "cors";
import "dotenv/config";
import routes from "./routes/authRoutes.js";
import problemRoutes from "./routes/problemRoutes.js";
import compilerRoutes from "./routes/compilerRoute.js";
import connectDB from "./database/db.js";
import cron from "node-cron";
import cleanupOldFiles from "./utils/cleanup.js";

const app = express();
connectDB();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.use("/", routes);
app.use("/problems", problemRoutes);
app.use("/run", compilerRoutes);

// Run every 10 minutes
cron.schedule("*/60 * * * *", () => {
  console.log("Running cleanup job...");
  cleanupOldFiles();
});

app.listen(3000, () => {
  console.log(`Server is running on port ${3000}`);
});
