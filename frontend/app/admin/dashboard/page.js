import Dashboard from "../../../Components/Dashboard";

export default function DashboardPage() {
  const websiteData = {
    users: 12340,
    orders: 2340,
    revenue: 90500,
    traffic: 64000,
  };

  return <Dashboard websiteData={websiteData} />;
}
