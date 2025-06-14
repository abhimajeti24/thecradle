import express from 'express';
import dotenv from "dotenv";
import cors from 'cors';
import helmet from 'helmet';
import connectDB from './config/db.js';

import galleryRoutes from "../src/routes/gallery.routes.js";
import visitorRoutes from "../src/routes/visitor.routes.js";

dotenv.config();

const app = express();

connectDB();

app.use(helmet({
  contentSecurityPolicy: process.env.NODE_ENV === 'production',
  crossOriginEmbedderPolicy:false,
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));   

app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  maxAge: 86400 
}));

app.use(express.urlencoded({ extended: true, limit: '10mb'}));

app.get("/",(req,res) => {
  res.status(200).send("Server is UP...");
});

app.use("/api/gallery", galleryRoutes);
app.use("/api/visitors", visitorRoutes);


export default app;

