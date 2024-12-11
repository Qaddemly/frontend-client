import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../common/Button";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import Select from "../common/Select";
import { Country, LocationType } from "../auth";

type SidebarFilterProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  //   ref: React.RefObject<HTMLDivElement>;
};
function SidebarFilter({ isOpen, setIsOpen }: SidebarFilterProps) {
  const locationTypeValues = Object.values(LocationType);
  const countryValues = Object.values(Country);
  return (
    <div className="absolute h-screen">
      <div
        className={`fixed left-0 top-0 h-full w-[25rem] transform bg-white p-5 shadow-lg ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out`}
      >
        <Button
          className="mb-3 rounded-full bg-none px-3 text-gray-700 hover:bg-main hover:text-white"
          onClick={() => setIsOpen(false)}
        >
          <FontAwesomeIcon icon={faClose} className="text-3xl" />
        </Button>

        <div className="flex items-center justify-between font-medium">
          <p className="text-xl text-gray-700">Job filter</p>
          <p className="text-main">Reset all</p>
        </div>

        <div className="mt-6 flex flex-col gap-5 font-semibold">
          <Select
            isFilter={true}
            label="Location type"
            name="experience.locationType"
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
            name="experience.locationType"
            id="locationType"
          >
            {countryValues.map((value) => (
              <option value={value} key={value}>
                {value}
              </option>
            ))}
          </Select>
        </div>
      </div>
    </div>
  );
}

export default SidebarFilter;
