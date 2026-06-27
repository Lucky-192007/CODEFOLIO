import DashboardLayout from "../layouts/DashboardLayout";
import DashboardHeader from "../components/dashboard/DashboardHeader";
import StatsCards from "../components/dashboard/StatsCards";
import RecentProjects from "../components/dashboard/RecentProjects";
import LivePreview from "../components/dashboard/LivePreview";

function Dashboard() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <DashboardHeader />
        <StatsCards />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <RecentProjects />
          <LivePreview />
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Dashboard;
