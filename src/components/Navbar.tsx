import { GiHamburgerMenu } from "react-icons/gi";
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
          <img
            className="rounded-full w-10 h-10 object-cover"
            src="https://www.marketeers.com/_next/image/?url=https%3A%2F%2Fimagedelivery.net%2F2MtOYVTKaiU0CCt-BLmtWw%2F22607e88-625f-4835-eaba-cad512b96300%2Fw%3D640&w=1920&q=75"
            alt=""
          />
        </div>
      </nav>
    </>
  );
};

export default Navbar;
