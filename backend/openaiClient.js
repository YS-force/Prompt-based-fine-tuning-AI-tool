// openaiClient.js
// Setup OpenAI client with API key from .env

import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();

if (!process.env.OPENAI_API_KEY) {
  console.warn("WARNING: OPENAI_API_KEY not set in .env");
}

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});
export const MODEL = process.env.OPENAI_MODEL || "gpt-4.1-mini";
