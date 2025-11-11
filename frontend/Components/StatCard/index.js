import React from "react";

const StatCard = ({ icon, title, value }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border">
    <div className="flex items-center justify-between mb-3 text-slate-700 text-2xl">
      {icon}
    </div>
    <p className="text-gray-500 text-sm">{title}</p>
    <p className="text-3xl font-semibold">{value}</p>
  </div>
);

export default StatCard;
