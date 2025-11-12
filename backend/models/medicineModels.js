// import mongoose from "mongoose";

// const MedicineSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   slug: { type: String, unique: true },
//   category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
//   manufacturer: { type: mongoose.Schema.Types.ObjectId, ref: "Manufacturer" },
//   description: String,
//   composition: [String],
//   indications: [String],
//   dosage: String,
//   sideEffects: [String],
//   precautions: [String],
//   storageInfo: String,
//   price: { type: Number, required: true },
//   quantity:{type:String , required:true},
//   discountPrice: Number,
//   stock: { type: Number, default: 0 },
//   expiryDate: Date,
//   prescriptionRequired: { type: Boolean, default: false },
//   images: [String],
//   thumbnail: String,
//   averageRating: { type: Number, default: 0 },
//   reviewsCount: { type: Number, default: 0 },
//   tags: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tag" }],
//   metaTitle: String,
//   metaDescription: String,
//   createdAt: { type: Date, default: Date.now },
// });

// // ✅ Default export (important)
// const Medicine = mongoose.model("medicine", MedicineSchema);
// export default Medicine;


import mongoose from "mongoose";

const ImageSchema = new mongoose.Schema({
  originalName: String,
  url: String,
  public_id: String,
});

const MedicineSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, unique: true },

  // ✅ Category and manufacturer can be ObjectId or string (for flexibility)
  category: { type: mongoose.Schema.Types.Mixed },
  manufacturer: { type: mongoose.Schema.Types.Mixed },

  description: String,
  composition: [String],
  indications: [String],
  dosage: String,
  sideEffects: [String],
  precautions: [String],
  storageInfo: String,

  batchNo:{type:String},
  type:{type:String},

  price: { type: Number, required: true },
  quantity: { type: String, required: true },
  discountPrice: Number,
  stock: { type: Number, default: 0 },
  expiryDate: Date,
  prescriptionRequired: { type: Boolean, default: false },

  // ✅ Image objects (instead of array of strings)
  images: [ImageSchema],
  thumbnail: String,

  averageRating: { type: Number, default: 0 },
  reviewsCount: { type: Number, default: 0 },

  // ✅ Allow simple tag strings for now
  tags: [String],

  metaTitle: String,
  metaDescription: String,
  createdAt: { type: Date, default: Date.now },
});

// ✅ Default export
const Medicine = mongoose.model("Medicine", MedicineSchema);
export default Medicine;
