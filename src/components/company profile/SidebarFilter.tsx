import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../common/Button";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { ReactNode } from "react";

type SidebarFilterProps = {
  isOpen: boolean;
  title: string;
  children: ReactNode;
  handleResetAll?: () => void;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

function SidebarFilter({
  isOpen,
  title,
  children,
  handleResetAll,
  setIsOpen,
}: SidebarFilterProps) {
  return (
    <div className="flex justify-center">
      <div
        className={`scrollbar-hide h-full w-[20rem] transform overflow-y-scroll bg-white p-5 text-right shadow-lg sm:w-[22rem] ${
          isOpen ? "block" : "hidden"
        } transition-all duration-300 ease-in-out`}
      >
        <Button
          className="bg-none hover:bg-none"
          onClick={() => setIsOpen(false)}
        >
          <FontAwesomeIcon
            icon={faClose}
            className="mb-3 rounded-full bg-[#eee] bg-none px-4 py-3 text-2xl text-gray-700 hover:bg-main hover:text-white"
          />
        </Button>

        <div className="flex items-center justify-between font-medium">
          <p className="text-xl text-gray-700">{title}</p>
          <button onClick={handleResetAll} className="text-main">
            Reset all
          </button>
        </div>
        <div className="mt-6 flex flex-col gap-5 font-semibold">{children}</div>
      </div>
    </div>
  );
}

export default SidebarFilter;
