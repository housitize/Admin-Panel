import React from "react";
import { FiPlusCircle } from "react-icons/fi";

const Medicines = ({ medicines }) => (
  <div>
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-2xl font-semibold">Medicines Inventory</h2>
      <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
        <FiPlusCircle />
        Add Medicine
      </button>
    </div>

    <div className="bg-white rounded-xl shadow-sm border overflow-x-auto">
      <table className="min-w-full text-sm">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="text-left p-3">Name</th>
            <th className="text-left p-3">Category</th>
            <th className="text-left p-3">Price (₹)</th>
            <th className="text-left p-3">Stock</th>
            <th className="text-right p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {medicines.map((m) => (
            <tr key={m.id} className="border-t hover:bg-gray-50">
              <td className="p-3">{m.name}</td>
              <td className="p-3">{m.category}</td>
              <td className="p-3">{m.price}</td>
              <td className="p-3">{m.stock}</td>
              <td className="p-3 text-right space-x-2">
                <button className="text-blue-600 hover:underline">Edit</button>
                <button className="text-red-600 hover:underline">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default Medicines;
