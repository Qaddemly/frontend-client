import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "./Button";

type SearchBarProps = {
  placeholder: string;
  buttonName: string;
};

function SearchBar({ placeholder, buttonName }: SearchBarProps) {
  return (
    <div className="max-w[950px] flex w-full items-center rounded-lg border border-gray-100 bg-white px-4 py-2 shadow-sm outline-none focus-within:ring-2">
      {/* <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" />
       */}
      <FontAwesomeIcon icon={faMagnifyingGlass} className="text-main" />
      <input
        type="text"
        placeholder={`${placeholder}`} // "Company name"
        className="ml-2 flex-1 text-sm text-gray-700 placeholder-gray-400 outline-none focus:outline-none"
      />
      <Button className="px-8 py-3">
        {buttonName} {/* Find Companies */}
      </Button>
    </div>
  );
}
export default SearchBar;
