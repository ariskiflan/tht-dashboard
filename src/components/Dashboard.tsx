import Navbar from "./Navbar";
import type { SetStateAction, Dispatch } from "react";
import { Outlet } from "react-router";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: Dispatch<SetStateAction<boolean>>;
}

const Dashboard = ({ setSidebarOpen }: SidebarProps) => {
  return (
    <>
      <div className="flex-1">
        <Navbar setSidebarOpen={setSidebarOpen} />

        <div className="">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
