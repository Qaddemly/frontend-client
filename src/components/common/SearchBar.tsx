import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type SearchBarProps = {
  placeholder: string;
  buttonName: string;
};

function SearchBar({ placeholder, buttonName }: SearchBarProps) {
  return (
    <div className="max-w[950px] flex w-full items-center rounded-lg border border-gray-300 bg-white px-4 py-2 shadow-sm focus-within:ring-2">
      {/* <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" />
       */}
      <FontAwesomeIcon icon={faMagnifyingGlass} className="text-main" />
      <input
        type="text"
        placeholder={`${placeholder}`} // "Company name"
        className="ml-2 flex-1 text-sm text-gray-700 placeholder-gray-400 focus:outline-none"
      />
      <button className="hover:bg-blue-700 focus:ring-blue-500 rounded-lg bg-main px-4 py-2 text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2">
        {buttonName} {/* Find Companies */}
      </button>
    </div>
  );
}
export default SearchBar;
