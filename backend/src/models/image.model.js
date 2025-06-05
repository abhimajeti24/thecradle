import mongoose from "mongoose";

const imageSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      required: true,
    },
    publicId: {
        type: String,
        required: true,
    },
    title: {
        type: String,
    },
    event: {
        type: String,
    },
  },

  { timestamps: true }
);

const Image = mongoose.model("Image", imageSchema);

export default Image;
