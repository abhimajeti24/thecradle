

import cloudinary from "../utils/cloudinary.js";
import Image from "../models/image.model.js";
import fs from "fs";

export const uploadImages = async (req, res) => {
  try {
    const { title, event } = req.body;
    const files = req.files;

    if (!files || files.length === 0) {
      return res.status(400).json({ error: "No files uploaded" });
    }

    const uploadedImages = [];

    // Upload all files to Cloudinary first
    for (const file of files) {
      const result = await cloudinary.uploader.upload(file.path, {
        folder: "school-gallery",
      });

      uploadedImages.push({
        url: result.secure_url,
        publicId: result.public_id,
        originalName: file.originalname,
        uploadedAt: new Date()
      });

      fs.unlinkSync(file.path); // delete local file after upload
    }

    // Create a single document with all images
    const newImageDocument = await Image.create({
      title,
      event,
      images: uploadedImages
    });

    console.log("FILES:", req.files);
    console.log("BODY:", req.body);

    res.status(201).json({ 
      message: `${uploadedImages.length} images uploaded successfully under "${title}"`, 
      document: newImageDocument 
    });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ error: error.message });
  }
};

export const getAllImages = async (req, res) => {
  try {
    // Get all image documents, grouped by title and event
    const imageDocuments = await Image.find().sort({ createdAt: -1 });
    
    if (!imageDocuments || imageDocuments.length === 0) {
      return res.status(404).json({ message: "No images found" });
    }

    // Format the response to show grouped images
    const formattedResponse = imageDocuments.map(doc => ({
      _id: doc._id,
      title: doc.title,
      event: doc.event,
      imageCount: doc.images.length,
      images: doc.images,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
      // Include first image as thumbnail for display
      thumbnail: doc.images.length > 0 ? doc.images[0].url : null
    }));

    res.status(200).json({
      message: `Found ${imageDocuments.length} gallery(s)`,
      galleries: formattedResponse
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteImage = async (req, res) => {
  try {
    const { documentId } = req.params;

    // Find the document
    const imageDocument = await Image.findById(documentId);
    if (!imageDocument) {
      return res.status(404).json({ message: "Gallery not found" });
    }

    // Delete all images from Cloudinary
    const deletePromises = imageDocument.images.map(image => 
      cloudinary.uploader.destroy(image.publicId)
    );
    
    await Promise.all(deletePromises);

    // Delete the entire document
    await Image.findByIdAndDelete(documentId);

    res.status(200).json({ 
      message: `Gallery "${imageDocument.title}" with ${imageDocument.images.length} images deleted successfully` 
    });
  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).json({ error: error.message });
  }
};

// Optional: Get a specific gallery by ID
export const getGalleryById = async (req, res) => {
  try {
    const { documentId } = req.params;
    
    const gallery = await Image.findById(documentId);
    if (!gallery) {
      return res.status(404).json({ message: "Gallery not found" });
    }

    res.status(200).json({
      _id: gallery._id,
      title: gallery.title,
      event: gallery.event,
      imageCount: gallery.images.length,
      images: gallery.images,
      createdAt: gallery.createdAt,
      updatedAt: gallery.updatedAt
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Optional: Delete a single image from a gallery (if you want this functionality)
export const deleteSingleImage = async (req, res) => {
  try {
    const { documentId, imageId } = req.params;

    const imageDocument = await Image.findById(documentId);
    if (!imageDocument) {
      return res.status(404).json({ message: "Gallery not found" });
    }

    // Find the specific image
    const imageToDelete = imageDocument.images.find(img => img._id.toString() === imageId);
    if (!imageToDelete) {
      return res.status(404).json({ message: "Image not found in gallery" });
    }

    // Delete from Cloudinary
    await cloudinary.uploader.destroy(imageToDelete.publicId);

    // Remove from document
    imageDocument.images = imageDocument.images.filter(img => img._id.toString() !== imageId);
    
    if (imageDocument.images.length === 0) {
      // If no images left, delete the entire document
      await Image.findByIdAndDelete(documentId);
      return res.status(200).json({ message: "Last image deleted, gallery removed" });
    } else {
      // Save the updated document
      await imageDocument.save();
      return res.status(200).json({ 
        message: "Image deleted from gallery",
        remainingImages: imageDocument.images.length
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// import cloudinary from "../utils/cloudinary.js";
// import Image from "../models/image.model.js";
// import fs from "fs";


// export const uploadImages = async (req, res) => {
//   try {
//     const { title, event } = req.body;
//     const files = req.files;

//     const uploadedImages = [];

//     for (const file of files) {
//       const result = await cloudinary.uploader.upload(file.path, {
//         folder: "school-gallery",
//       });

//       const newImage = await Image.create({
//         title,
//         event,
//         url: result.secure_url,
//         publicId: result.public_id,
//       });

//       uploadedImages.push(newImage);
//       fs.unlinkSync(file.path); // delete local file after upload
//     }
//     console.log("FILES:", req.files);
//     console.log("BODY:", req.body);

//     res.status(201).json({ message: "All images uploaded", uploadedImages });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// export const getAllImages = async (req, res) => {
//   const images = await Image.find().sort({ createdAt: -1 });
//   if (!images) {
//     return res.status(404).json({ message: "No images found" });
//   }
//   res.status(200).json(images);
// };

// export const deleteImage = async (req, res) => {
//   const { imageId } = req.params;

//   const image = await Image.findById(imageId);
//   if (!image) return res.status(404).json({ message: "Image not found" });

//   await cloudinary.uploader.destroy(image.publicId);
//   await Image.findByIdAndDelete(imageId);

//   res.status(200).json({ message: "Image deleted" });
// };