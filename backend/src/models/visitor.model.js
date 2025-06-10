import mongoose from "mongoose";

const visitorSchema = new mongoose.Schema({
  visitedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Visitor", visitorSchema);
