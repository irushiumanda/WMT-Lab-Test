import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import itemRoutes from "./routes/itemRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const DEFAULT_LOCAL_MONGO_URI = "mongodb://127.0.0.1:27017/item-manager";
const mongoUri = (process.env.MONGO_URI || DEFAULT_LOCAL_MONGO_URI).trim();

function validateMongoUri(uri) {
  if (!uri) {
    throw new Error(
      "MONGO_URI is missing. Set it in .env or use a local MongoDB instance."
    );
  }

  if (
    uri.includes("<username>") ||
    uri.includes("<password>") ||
    uri.includes("cluster0.mongodb.net/myFirstDatabase")
  ) {
    throw new Error(
      "MONGO_URI still contains the starter placeholder values. Use a real MongoDB Atlas connection string or mongodb://127.0.0.1:27017/item-manager for local development."
    );
  }
}

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Item Manager API is running..." });
});

app.use("/api/items", itemRoutes);

try {
  validateMongoUri(mongoUri);
} catch (error) {
  console.error("Configuration error:", error.message);
  process.exit(1);
}

mongoose
  .connect(mongoUri)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Database connection error:", error.message);
    if (error.name) {
      console.error("Database error name:", error.name);
    }
    if (error.code) {
      console.error("Database error code:", error.code);
    }
    if (error.cause?.message) {
      console.error("Database error cause:", error.cause.message);
    }
    process.exit(1);
  });
