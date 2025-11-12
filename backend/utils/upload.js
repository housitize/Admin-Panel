import multer from "multer";

const storage = multer.memoryStorage();

const fileFilter = (_req, file, cb) => {
  // Accept images only
  if (/^image\/(png|jpe?g|webp|gif|bmp|tiff?)$/.test(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed"), false);
  }
};

export const uploadPhotos = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB per file
    files: 20,                 // up to 20 images
  },
}).array("images", 20); // <input name="photos" multiple />