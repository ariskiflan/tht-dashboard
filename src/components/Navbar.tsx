import { GiHamburgerMenu } from "react-icons/gi";
import { FaShoppingCart } from "react-icons/fa";
import type { SetStateAction, Dispatch } from "react";

interface SidebarProps {
  // sidebarOpen: boolean;
  setSidebarOpen: Dispatch<SetStateAction<boolean>>;
}

const Navbar = ({ setSidebarOpen }: SidebarProps) => {
  return (
    <>
      <nav className="bg-white p-4 flex justify-between fixed top-0 left-0 right-0 z-10">
        <div>
          <button onClick={() => setSidebarOpen(true)}>
            <GiHamburgerMenu size={36} className="lg:hidden" />
          </button>
        </div>

        <div>
          <FaShoppingCart size={36} />
        </div>
      </nav>
    </>
  );
};

export default Navbar;
