import express from "express";
import upload from "../utils/multer.js";
import { uploadImage, getAllImages, deleteImage } from "../controllers/gallery.controllers.js";

const router = express.Router();

router.post("/upload", upload.single('image'), uploadImage);
router.get("/", getAllImages);
router.delete("/:id", deleteImage);

export default router;