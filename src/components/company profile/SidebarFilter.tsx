import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../common/Button";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { ReactNode } from "react";
import Select from "../common/Select";
import { Country, LocationType } from "../../enums/index.enums";

type SidebarFilterProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  ref: React.RefObject<HTMLDivElement>;
  divRef: React.RefObject<HTMLDivElement>;
  title: string;
  children: ReactNode;
};

function SidebarFilter({
  isOpen,
  setIsOpen,
  ref,
  divRef,
  title,
  children,
}: SidebarFilterProps) {
  const locationTypeValues = Object.values(LocationType);
  const countryValues = Object.values(Country);
  return (
    <div ref={ref}>
      <div
        ref={divRef}
        className={`scrollbar-hide fixed right-0 top-0 h-full w-[25rem] transform overflow-y-scroll bg-white p-5 text-right shadow-lg ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out`}
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
          <p className="text-main">Reset all</p>
        </div>
        <div className="mt-6 flex flex-col gap-5 font-semibold">
          <Select
            isFilter={true}
            label="Location type"
            // name="experience.locationType"
            id="locationType"
          >
            {locationTypeValues.map((value) => (
              <option value={value} key={value}>
                {value}
              </option>
            ))}
          </Select>
          <Select
            isFilter={true}
            label="Location"
            // name="experience.locationType"
            id="locationType"
          >
            {countryValues.map((value) => (
              <option value={value} key={value}>
                {value}
              </option>
            ))}
          </Select>
          {children}
        </div>
      </div>
    </div>
  );
}

export default SidebarFilter;
