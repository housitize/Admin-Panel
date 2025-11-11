const ReviewSchema = new mongoose.Schema({
  medicine: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Medicine",
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // assuming you have a user model
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  title: String, // short headline like "Worked Great!" or "Not Effective"
  comment: {
    type: String,
    required: true,
  },
  images: [String], // optional review images (like uploaded prescriptions)
  verifiedPurchase: {
    type: Boolean,
    default: false,
  },
  helpfulVotes: {
    type: Number,
    default: 0,
  },
  reported: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
