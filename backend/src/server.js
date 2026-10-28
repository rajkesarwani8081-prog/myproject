import "dotenv/config";
import express from "express";
import cors from "cors";
import scanRouter from "./routes/scan.js";

const app = express();
const PORT = Number(process.env.PORT) || 5000;

app.use(cors({ origin: ["http://localhost:5173", "http://127.0.0.1:5173"] }));
app.use(express.json({ limit: "1mb" }));

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", service: "phishing-detection-api", time: new Date().toISOString() });
});

app.use("/api", scanRouter);

app.use((error, _req, res, _next) => {
  console.error(error);
  res.status(error.status || 500).json({ error: error.message || "Internal server error" });
});

app.listen(PORT, () => {
  console.log(`Phishing Detection API running at http://localhost:${PORT}`);
});