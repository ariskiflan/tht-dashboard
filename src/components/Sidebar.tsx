import { FaHome, FaBoxOpen, FaShoppingCart, FaUtensils } from "react-icons/fa";
import { GiCancel } from "react-icons/gi";
import { Link } from "react-router";
import type { ReactNode, Dispatch, SetStateAction } from "react";

interface MenuItem {
  name: string;
  link: string;
  icon: ReactNode;
}

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: Dispatch<SetStateAction<boolean>>;
}

const menuItems: MenuItem[] = [
  { name: "Home", link: "/", icon: <FaHome size={24} /> },
  { name: "Product", link: "/products", icon: <FaBoxOpen size={24} /> },
  { name: "Recipe", link: "/recipes", icon: <FaUtensils size={24} /> },
  { name: "Cart", link: "/carts", icon: <FaShoppingCart size={24} /> },
];

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  return (
    <>
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div
        className={`w-64 bg-soft-blue fixed top-0  h-screen ${sidebarOpen ? "translate-x-0" : "-translate-x-64"} lg:static lg:translate-x-0 transition-all duration-200 ease-in-out z-50`}
      >
        <div className="flex flex-col gap-10">
          <div className="border-b text-white flex justify-between items-center p-4">
            <h1 className="text-3xl font-bold text-white ">Dashboard</h1>
            <button onClick={() => setSidebarOpen(false)}>
              <GiCancel size={24} className="lg:hidden" />
            </button>
          </div>

          <div>
            <ul className="space-y-4">
              {menuItems.map((item: MenuItem, index) => (
                <li key={index}>
                  <Link to={item.link}>
                    <p className="flex text-2xl text-white items-center gap-5 hover:bg-blue-900 px-3 py-2 rounded transition-colors">
                      {item.icon}
                      {item.name}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
