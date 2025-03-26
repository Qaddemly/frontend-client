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
      className={`${className ? className : "flex w-full max-w-[950px] items-center rounded-lg border border-gray-100 bg-white px-2 py-2 shadow-sm outline-none focus-within:ring-2 md:px-4"}`}
    >
      <FontAwesomeIcon icon={faMagnifyingGlass} className="text-main" />
      <input
        value={search}
        onChange={(e) => setSearch && setSearch(e.target.value)}
        type="text"
        placeholder={`${placeholder}`}
        className="ml-2 w-[8rem] flex-1 text-sm text-gray-700 placeholder-gray-400 outline-none focus:outline-none sm:w-full"
      />
      <Button
        onClick={onClick}
        className={` ${btnClassName ? btnClassName : "px-2 sm:px-4 md:px-8"}`}
      >
        {buttonName}
      </Button>
    </div>
  );
}
export default SearchBar;
