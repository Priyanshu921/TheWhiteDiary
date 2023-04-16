import express from "express";
import { getRandomQuote } from "../controllers/quote.controller";
const quoteRoutes = express();
quoteRoutes.get("/getRandomQuote", getRandomQuote);
export default quoteRoutes;
