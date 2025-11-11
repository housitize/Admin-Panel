import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema({
  // Basic Details
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true }, // for SEO URLs
  summary: { type: String }, // short intro shown on blog cards
  content: { type: String, required: true }, // main HTML/Markdown content

  // Author Info
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // reference to admin or author
    required: true,
  },

  // Media
  coverImage: { type: String }, // thumbnail/hero image URL
  gallery: [String], // optional array of related images

  // Categorization
  category: {
    type: String,
    enum: ["Health Tips", "Medicine Info", "Wellness", "Offers", "News"],
    default: "Health Tips",
  },
  tags: [String], // for filtering/searching

  // Engagement
  likes: { type: Number, default: 0 },
  views: { type: Number, default: 0 },

  // Comments (embedded or referenced)
  comments: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      name: String, // fallback if anonymous
      comment: String,
      createdAt: { type: Date, default: Date.now },
    },
  ],

  // SEO & Metadata
  metaTitle: String,
  metaDescription: String,
  keywords: [String],

  // Timestamps
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  publishedAt: Date,
  isPublished: { type: Boolean, default: false },
});

export default mongoose.models.Blog || mongoose.model("Blog", BlogSchema);
