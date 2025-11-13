import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

// ✅ Configure Cloudinary with environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default cloudinary;

/**
 * Upload image from base64 or URL
 * (used when frontend sends image as base64 or remote URL)
 */
export const uploadImage = async (file, folder = "housitize/medicineondoor") => {
  try {
    const result = await cloudinary.uploader.upload(file, {
      folder,
      resource_type: "image",
    });
    return {
      url: result.secure_url,
      public_id: result.public_id,
    };
  } catch (err) {
    throw new Error("Image upload failed: " + err.message);
  }
};

/**
 * Upload image buffer (used with multer.memoryStorage)
 * - buffer: raw file buffer
 * - folder: optional folder name
 */
export const uploadBuffer = (buffer, folder = "housitize/medicineondoor") =>
  new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder, resource_type: "image" },
      (err, result) => {
        if (err) return reject(err);
        resolve({
          url: result.secure_url,
          public_id: result.public_id,
        });
      }
    );
    stream.end(buffer); // send the buffer to Cloudinary
  });

/**
 * Delete image by public ID
 */
export const deleteImage = async (publicId) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result;
  } catch (err) {
    throw new Error("Image deletion failed: " + err.message);
  }
};
