import Medicines from "../../../Components/Medicines";

export default function MedicinesPage() {
  const medicines = [
    {
      id: 1,
      name: "Paracetamol",
      company: "Sun Pharma",
      category: "Pain Relief",
      type: "tablet",
      stripSize: "10 tablets",
      batchNo: "BT2024001",
      expiryDate: "Dec 2025",
      price: 45,
      discount: 10,
      stock: 150,
      lowStock: false,
    }
  ];

  return <Medicines medicines={medicines} />;
}
