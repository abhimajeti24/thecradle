// routes/gallery.routes.js
import express from "express";
import upload from "../utils/multer.js";
import { 
  uploadImages, 
  getAllImages, 
  deleteImage,
  getGalleryById,
  deleteSingleImage
} from "../controllers/gallery.controllers.js";

const router = express.Router();

// Upload images (creates new gallery document)
router.post("/upload", upload.array('images'), uploadImages);

// Get all galleries
router.get("/", getAllImages);

// Get specific gallery by ID
router.get("/:documentId", getGalleryById);

// Delete entire gallery (all images under one title/event)
router.delete("/:documentId", deleteImage);

// Optional: Delete single image from gallery
router.delete("/:documentId/image/:imageId", deleteSingleImage);

export default router;