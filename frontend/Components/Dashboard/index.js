import React from "react";
import { FiUsers, FiShoppingBag, FiEye } from "react-icons/fi";
import { HiOutlineChartBar } from "react-icons/hi";
import StatCard from "../StatCard";

const Dashboard = ({ websiteData }) => (
  <div>
    <h2 className="text-2xl font-semibold mb-6">Dashboard Overview</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      <StatCard icon={<FiUsers />} title="Users" value={websiteData.users} />
      <StatCard icon={<FiShoppingBag />} title="Orders" value={websiteData.orders} />
      <StatCard icon={<HiOutlineChartBar />} title="Revenue" value={`$${websiteData.revenue}`} />
      <StatCard icon={<FiEye />} title="Traffic" value={websiteData.traffic} />
    </div>
  </div>
);

export default Dashboard;
