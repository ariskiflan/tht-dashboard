// src/components/SidebarLayout.tsx
import { useState,  } from "react";
import type { ReactNode } from "react";
import {
  FaBars,
  FaTimes,
  FaHome,
  FaBoxOpen,
  FaShoppingCart,
  FaUtensils,
} from "react-icons/fa";
import { Link } from "react-router";

interface MenuItem {
  name: string;
  link: string;
  icon: ReactNode;
}

const SidebarLayout = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const menuItems: MenuItem[] = [
    { name: "Home", link: "/", icon: <FaHome /> },
    { name: "Product", link: "/products", icon: <FaBoxOpen /> },
    { name: "Cart", link: "/carts", icon: <FaShoppingCart /> },
    { name: "Recipe", link: "/recipes", icon: <FaUtensils /> },
  ];

  return (
    <>
      {/* Tombol Burger untuk Mobile */}
      <div className="lg:hidden p-4 bg-white border-b border-gray-300 text-black flex items-center">
        <button onClick={() => setIsOpen(true)}>
          <FaBars size={24} className="text-soft-blue" />
        </button>
        <h1 className="ml-4 text-soft-blue font-bold text-lg">Dashboard</h1>
      </div>

      {/* Sidebar Desktop */}
      <aside className="hidden lg:flex lg:flex-col w-64 bg-soft-blue text-soft-white shadow-lg p-6 fixed h-full border-r border-soft-gray">
        <h1 className="text-2xl font-bold mb-8">Dashboard</h1>
        <ul className="space-y-4">
          {menuItems.map((item: MenuItem, index) => (
            <li key={index}>
              <Link to={item.link}>
                <p className="flex items-center gap-3 hover:bg-blue-900 px-3 py-2 rounded transition-colors">
                  {item.icon}
                  {item.name}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </aside>

      {/* Sidebar Mobile */}
      <div
        className={`lg:hidden fixed top-0 left-0 h-full w-64 bg-soft-blue text-white shadow-lg z-50 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-soft-gray">
          <h1 className="text-xl font-bold">Dashboard</h1>
          <button onClick={() => setIsOpen(false)}>
            <FaTimes size={24} />
          </button>
        </div>
        <ul className="p-4 space-y-4">
          {menuItems.map((item: MenuItem, index) => (
            <li key={index}>
              <Link
                to={item.link}
                onClick={() => setIsOpen(false)} // otomatis close setelah klik
              >
                 <p className="flex items-center gap-3 hover:bg-blue-900 px-3 py-2 rounded transition-colors">
                  {item.icon}
                  {item.name}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Overlay ketika sidebar mobile terbuka */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0  bg-[rgba(0,0,0,0.5)] z-40"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
};

export default SidebarLayout;
