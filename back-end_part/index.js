import express from "express";
import cors from "cors";
import recommendationRoutes from "./src/routers/recommendation.js";
import "dotenv/config";

const app = express();

app.use(cors());
app.use(express.json());
app.use(recommendationRoutes);

app.use((req, res) => {
  return res.status(404).json({ status: "Endpoint does not exist" });
});

app.listen(process.env.PORT, () => {
  console.log(`Express started on http://localhost:${process.env.PORT}`);
});
