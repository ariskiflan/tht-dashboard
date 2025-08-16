import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Dashboard from "../components/Dashboard";

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  return (
    <>
      <div className="lg:flex bg-gray-100 h-screen ">
        <Sidebar setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen} />

        <div className="overflow-y-auto flex-1">
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
