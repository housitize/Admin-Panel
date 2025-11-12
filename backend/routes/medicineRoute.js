import express from "express";
import {
  createMedicine,
  getMedicines,
  getMedicineById,
  updateMedicine,
  deleteMedicine,
  getMedicinesByCategory,
  getMedicineBySlug,
} from "../controllers/medicineController.js";
import authUser from "../middleware/auth.js";
import {uploadPhotos} from "../utils/upload.js"

const medicineRouter = express.Router();

medicineRouter.post("/create", authUser, uploadPhotos , createMedicine);

medicineRouter.get("/getAll", getMedicines);
medicineRouter.post("/getByCategory", getMedicinesByCategory);

medicineRouter.get("/get/slug/:slug", getMedicineBySlug);
medicineRouter.get("/get/:id", getMedicineById);

medicineRouter.put("/update/:id", authUser,uploadPhotos , updateMedicine);

medicineRouter.delete("/delete/:id", authUser, deleteMedicine);

export default medicineRouter;
