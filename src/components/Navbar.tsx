// src/components/SidebarLayout.tsx
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

interface MenuItem {
  name: string;
  link: string;
}

export default function SidebarLayout() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const menuItems: MenuItem[] = [
    { name: "Home", link: "/" },
    { name: "Product", link: "/product" },
    { name: "Cart", link: "/cart" },
    { name: "Recipe", link: "/recipe" },
  ];

  return (
    <div className="flex h-screen bg-soft-gray">
      {/* Sidebar Desktop */}
      <aside className="hidden lg:flex lg:flex-col w-64 bg-soft-blue text-soft-white shadow-lg p-6 fixed h-full border-r border-soft-gray">
        <h1 className="text-2xl font-bold mb-8">Dashboard</h1>
        <ul className="space-y-4">
          {menuItems.map((item) => (
            <li key={item.name}>
              <a
                href={item.link}
                className="block hover:bg-blue-900 px-3 py-2 rounded transition-colors"
              >
                {item.name}
              </a>
            </li>
          ))}
        </ul>
      </aside>

      {/* Sidebar Mobile */}
      <div
        className={`lg:hidden fixed top-0 left-0 w-64 h-screen bg-soft-blue text-soft-white shadow-lg p-6 z-20 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-xl font-bold">Dashboard</h1>
          <button
            onClick={() => setIsOpen(false)}
            className="text-soft-white hover:text-soft-gray"
          >
            <FaTimes size={24} />
          </button>
        </div>
        <ul className="space-y-4">
          {menuItems.map((item) => (
            <li key={item.name}>
              <a
                href={item.link}
                className="block hover:bg-blue-900 px-3 py-2 rounded transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Overlay Mobile */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-10"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col w-full lg:ml-64">
        {/* Top bar for mobile */}
        <header className="lg:hidden flex items-center p-4 bg-soft-white shadow-md">
          <button onClick={() => setIsOpen(true)} className="text-soft-blue">
            <FaBars size={24} />
          </button>
          <h1 className="ml-4 text-xl font-bold text-soft-blue">Dashboard</h1>
        </header>

        {/* Page Content */}
        <main className="p-6 bg-soft-white flex-1">
          <h2 className="text-2xl font-bold text-soft-blue">
            Dashboard Content
          </h2>
          <p className="mt-4 text-soft-gray">
            Ini area konten yang akan menyesuaikan ukuran ketika sidebar muncul.
          </p>
        </main>
      </div>
    </div>
  );
}
