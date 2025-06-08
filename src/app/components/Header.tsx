import { RxHamburgerMenu } from "react-icons/rx";
import { IoSearch } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa6";
function Header() {
  return (
    <div className="w-full border-b-[#c7cad0]  border-b-2">
      <div className="max-w-[2000px] mx-auto">
        <div className="w-full flex items-center justify-between p-4  ">
          <RxHamburgerMenu className="text-2xl mt-1" />
          <div className="flex items-center gap-4">
            <IoSearch className="text-xl mt-1" />
            <p className="text-xl">|</p>
            <FaRegUser className="text-xl mt-1" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
