
import mongoose from 'mongoose';

const imageSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  event: {
    type: String,
    required: true
  },
  images: [{
    url: {
      type: String,
      required: true
    },
    publicId: {
      type: String,
      required: true
    },
    originalName: {
      type: String
    },
    uploadedAt: {
      type: Date,
      default: Date.now
    }
  }]
}, {
  timestamps: true
});

// Add index for better query performance
imageSchema.index({ title: 1, event: 1 });
imageSchema.index({ createdAt: -1 });

const Image = mongoose.model('Image', imageSchema);
export default Image;

// import mongoose from "mongoose";

// const imageSchema = new mongoose.Schema(
//   {
//     url: {
//       type: String,
//       required: true,
//     },
//     publicId: {
//         type: String,
//         required: true,
//     },
//     title: {
//         type: String,
//     },
//     event: {
//         type: String,
//     },
//   },

//   { timestamps: true }
// );

// const Image = mongoose.model("Image", imageSchema);

// export default Image;


// models/image.model.js