import { RxHamburgerMenu } from "react-icons/rx";
import { signOut } from "../auth/actions";

function Header({ userEmail }: { userEmail: string }) {
  return (
    <div className="w-full border-b-[#c7cad0]  border-b-2">
      <div className="max-w-[2000px] mx-auto">
        <div className="w-full flex items-center justify-end p-4">
          <div className="flex items-center gap-4">
            <div className="text-xl">
              <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium">
                {userEmail?.[0].toUpperCase()}
              </div>
            </div>
            <div className="text-xl">|</div>
            <button
              className="bg-red-500 hover:bg-red-600 text-white font-medium px-2 py-1 rounded-lg shadow-sm transition-all duration-200 ease-in-out transform hover:scale-[1.02] cursor-pointer"
              onClick={signOut}
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
