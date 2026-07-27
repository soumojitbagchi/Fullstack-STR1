import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
const app = express();
import authRoutes from "./routes/auth.route.js";
import productRoutes from "./routes/product.route.js";
import userRoutes from "./routes/user.route.js";

app.use(express.json());
app.use(cors({ origin: ["http://localhost:5173", "http://127.0.0.1:5173"], credentials: true }));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cookieParser());

/* serve product images as static files */
app.use("/images", express.static(path.join(__dirname, "../public/images")));

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/user", userRoutes);

export default app;
