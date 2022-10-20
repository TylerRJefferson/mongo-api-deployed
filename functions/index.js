import functions from "firebase-functions";
import express from "express";
import cors from "cors";
import { getAllFurniture } from "./src/furniture.js";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/furniture", (getAllFurniture));

export const api = functions.https.onRequest(app);
