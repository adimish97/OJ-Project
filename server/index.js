import express from "express";
import cors from "cors";
import "dotenv/config";
import routes from "./routes/authRoutes.js";
import connectDB from "./database/db.js";

const app = express();
connectDB();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.use("/", routes);

app.listen(3000, () => {
  console.log(`Server is running on port ${3000}`);
});
