import Medicine from "../models/medicineModels.js";
import userModel from "../models/userModels.js";
import { deleteImage, uploadBuffer, uploadImage } from "../utils/cloudinary.js";

export const createMedicine = async (req, res) => {
  try {
    const userId = req.user?.id;
    const user = await userModel.findById(userId);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    if (user.role !== "super_admin") {
      return res.status(403).json({ success: false, message: "Unauthorized" });
    }

    // console.log("Form fields:", req.body);
    // console.log("Uploaded files:", req.files);

    // ✅ Upload each image buffer to Cloudinary
    const uploadedImages = await Promise.all(
      req.files.map(async (file) => {
        const uploaded = await uploadBuffer(file.buffer);
        return {
          originalName: file.originalname,
          url: uploaded.url,
          public_id: uploaded.public_id,
        };
      })
    );

    // console.log("uploadedImages", uploadedImages);

    // ✅ Combine form data + image URLs
    const medicineData = {
      ...req.body,
      images: uploadedImages,
    };

    // ✅ Save to MongoDB
    const medicine = await Medicine.create(medicineData);

    res.status(201).json({
      success: true,
      message: "Medicine created successfully",
      medicine,
    });
  } catch (error) {
    console.error("Create medicine error:", error);
    res.status(400).json({ success: false, message: error.message });
  }
};

// ✅ READ ALL
export const getMedicines = async (req, res) => {
  try {
    const medicines = await Medicine.find();
    // console.log("medicine", medicines);
    res.status(200).json({
      medicines,
      success: true,
      message: "Medicines fetched successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
export const getMedicinesByCategory = async (req, res) => {
  try {
    const category = req.body;
    const medicines = await Medicine.find();
    res.status(200).json(medicines);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ READ ONE
export const getMedicineById = async (req, res) => {
  try {
    const medicine = await Medicine.findById(req.params.id).populate(
      "category manufacturer tags"
    );
    if (!medicine)
      return res.status(404).json({ message: "Medicine not found" });
    res.json(medicine);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMedicineBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const medicine = await Medicine.findOne({ slug });

    // console.log("medicine at backend", medicine);

    if (!medicine)
      return res
        .status(404)
        .json({ success: false, message: "Medicine not found" });

    res.status(200).json({ success: true, medicine });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ UPDATE
// export const updateMedicine = async (req, res) => {
//   try {
//     const { id } = req.params;
//     console.log("req.body:", req.body);
//     console.log("req.files:", req.files);

//     const existingMedicine = await Medicine.findById(id);
//     if (!existingMedicine) {
//       return res
//         .status(404)
//         .json({ success: false, message: "Medicine not found" });
//     }

//     // ✅ Parse the old images that user kept (from frontend)
//     // Frontend should send them as JSON string in req.body.existingImages
//     let existingImages = [];
//     if (req.body.existingImages) {
//       try {
//         existingImages = JSON.parse(req.body.existingImages);
//       } catch (e) {
//         console.error("Error parsing existingImages:", e);
//       }
//     }

//     // ✅ Delete only images removed by user
//     const removedImages = existingMedicine.images.filter(
//       (oldImg) =>
//         !existingImages.some((img) => img.public_id === oldImg.public_id)
//     );

//     for (const img of removedImages) {
//       await deleteImage(img.public_id);
//     }

//     // ✅ Upload new images (if any)
//     let newUploadedImages = [];
//     if (req.files && req.files.length > 0) {
//       newUploadedImages = await Promise.all(
//         req.files.map(async (file) => {
//           const uploaded = await uploadBuffer(file.buffer);
//           return {
//             originalName: file.originalname,
//             url: uploaded.url,
//             public_id: uploaded.public_id,
//           };
//         })
//       );
//     }

//     // ✅ Combine existing kept images + newly uploaded ones
//     const finalImages = [...existingImages, ...newUploadedImages];

//     // ✅ Update medicine
//     const updatedMedicine = await Medicine.findByIdAndUpdate(
//       id,
//       { ...req.body, images: finalImages },
//       { new: true }
//     );

//     res.json({
//       success: true,
//       message: "Medicine updated successfully",
//       medicine: updatedMedicine,
//     });
//   } catch (err) {
//     console.error("Update error:", err);
//     res.status(500).json({ success: false, message: err.message });
//   }
// };


export const updateMedicine = async (req, res) => {
  try {
    const { id } = req.params;
    const existingMedicine = await Medicine.findById(id);

    if (!existingMedicine) {
      return res.status(404).json({ success: false, message: "Medicine not found" });
    }

    // ✅ Parse existing images coming from frontend
    const existingImages = req.body.existingImages ? JSON.parse(req.body.existingImages) : [];

    // ✅ Upload new images (if any)
    let newUploadedImages = [];
    if (req.files && req.files.length > 0) {
      newUploadedImages = await Promise.all(
        req.files.map(async (file) => {
          const uploaded = await uploadBuffer(file.buffer);
          return {
            originalName: file.originalname,
            url: uploaded.url,
            public_id: uploaded.public_id,
          };
        })
      );
    }

    // ✅ Merge old (kept) and new images
    const finalImages = [...existingImages, ...newUploadedImages];

    // ✅ Find which old images were deleted by user and remove them from Cloudinary
    const removedImages = existingMedicine.images.filter(
      (img) => !existingImages.some((ex) => ex.public_id === img.public_id)
    );
    for (const img of removedImages) {
      await deleteImage(img.public_id);
    }

    // ✅ Update medicine
    const updatedMedicine = await Medicine.findByIdAndUpdate(
      id,
      { ...req.body, images: finalImages },
      { new: true }
    );

    res.json({
      success: true,
      message: "Medicine updated successfully",
      medicine: updatedMedicine,
    });
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};


// ✅ DELETE
export const deleteMedicine = async (req, res) => {
  try {
    const medicine = await Medicine.findById(req.params.id);
    if (!medicine)
      return res.status(404).json({ message: "Medicine not found" });
    if (medicine.images && medicine.images.length > 0) {
      for (const img of medicine.images) {
        if (img.public_id) {
          try {
            await deleteImage(img.public_id);
          } catch (cloudErr) {
            console.warn(
              "⚠️ Failed to delete image:",
              img.public_id,
              cloudErr.message
            );
          }
        }
      }
    }
    await Medicine.findByIdAndDelete(req.params.id);
    res.json({ message: "Medicine and images deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
