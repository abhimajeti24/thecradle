import cloudinary from "../utils/cloudinary.js";
import  Image  from "../models/image.model.js";
import fs from "fs";

export const uploadImage = async (req, res) => {
  try {
    const { path } = req.file;
    const result = await cloudinary.uploader.upload(path, {
      folder: "school-gallery",
    });
    const newImage = await Image.create({
      title: req.body.title,
      event: req.body.event,
      url: result.secure_url,
      publicId: result.public_id,
    });
    fs.unlinkSync(path);

    res.status(201).json(newImage);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllImages = async (req, res) => {
  const images = await Image.find().sort({ createdAt: -1 });
  if(!images){
    return res.status(404).json({ message: "No images found"});
  }
  res.status(200).json(images);
};

export const deleteImage = async (req, res) => {
  const { id } = req.params;

  const image = await Image.findById(id);
  if (!image) return res.status(404).json({ message: "Image not found" });

  await cloudinary.uploader.destroy(image.publicId);
  await Image.findByIdAndDelete(id);

  res.status(200).json({ message: "Image deleted" });
};
