import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "./Button";

type SearchBarProps = {
  placeholder: string;
  buttonName: string;
  className?: string;
  btnClassName?: string;
  search?: string;
  setSearch?: (search: string) => void;
  onClick?: () => void;
};

function SearchBar({
  placeholder,
  buttonName,
  search,
  btnClassName,
  className,
  setSearch,
  onClick,
}: SearchBarProps) {
  return (
    <div
      className={`${className ? className : "flex w-full max-w-[950px] items-center rounded-lg border border-gray-100 bg-white px-4 py-2 shadow-sm outline-none focus-within:ring-2"}`}
    >
      {/* <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" />
       */}
      <FontAwesomeIcon icon={faMagnifyingGlass} className="text-main" />
      <input
        value={search}
        onChange={(e) => setSearch && setSearch(e.target.value)}
        type="text"
        placeholder={`${placeholder}`} // "Company name"
        className="ml-2 flex-1 text-sm text-gray-700 placeholder-gray-400 outline-none focus:outline-none"
      />
      <Button
        onClick={onClick}
        className={`${btnClassName ? btnClassName : "px-8 py-2"}`}
      >
        {buttonName} {/* Find Companies */}
      </Button>
    </div>
  );
}
export default SearchBar;
