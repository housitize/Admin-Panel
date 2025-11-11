import mongoose from "mongoose";

const MedicineSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, unique: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  manufacturer: { type: mongoose.Schema.Types.ObjectId, ref: "Manufacturer" },
  description: String,
  composition: [String],
  indications: [String],
  dosage: String,
  sideEffects: [String],
  precautions: [String],
  storageInfo: String,
  price: { type: Number, required: true },
  quantity:{type:String , required:true},
  discountPrice: Number,
  stock: { type: Number, default: 0 },
  expiryDate: Date,
  prescriptionRequired: { type: Boolean, default: false },
  images: [String],
  thumbnail: String,
  averageRating: { type: Number, default: 0 },
  reviewsCount: { type: Number, default: 0 },
  tags: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tag" }],
  metaTitle: String,
  metaDescription: String,
  createdAt: { type: Date, default: Date.now },
});

// ✅ Default export (important)
const Medicine = mongoose.model("medicine", MedicineSchema);
export default Medicine;
