import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Dashboard from "../components/Dashboard";

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  return (
    <>
      <div className="lg:flex bg-gray-100 h-screen ">
        <Sidebar setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen} />

        <div className="flex-1 lg:ml-64">
          <Dashboard
            setSidebarOpen={setSidebarOpen}
            sidebarOpen={sidebarOpen}
          />
        </div>
      </div>
    </>
  );
};

export default Layout;
