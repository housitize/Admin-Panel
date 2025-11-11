import Medicine from "../models/medicineModels.js";

export const createMedicine = async (req, res) => {
  try {
    const medicine = await Medicine.create(req.body);
    res.status(201).json(medicine);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// ✅ READ ALL
export const getMedicines = async (req, res) => {
  try {
    const medicines = await Medicine.find();
    console.log("medicine" , medicines);
    res.status(200).json({medicines , success:true , message:"Medicines fetched successfully"});
  } catch (error) {
    res.status(500).json({success:false ,  message: error.message });
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
    const medicine = await Medicine.findById(req.params.id)
      .populate("category manufacturer tags");
    if (!medicine) return res.status(404).json({ message: "Medicine not found" });
    res.json(medicine);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMedicineBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const medicine = await Medicine.findOne({ slug });

    console.log("medicine at backend" , medicine);

    if (!medicine)
      return res.status(404).json({ success: false, message: "Medicine not found" });

    res.status(200).json({ success: true, medicine });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ UPDATE
export const updateMedicine = async (req, res) => {
  try {
    const updated = await Medicine.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Medicine not found" });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ DELETE
export const deleteMedicine = async (req, res) => {
  try {
    await Medicine.findByIdAndDelete(req.params.id);
    res.json({ message: "Medicine deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
