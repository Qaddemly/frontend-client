import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../common/Button";

function NavMessage() {
  return (
    <div className="flex flex-col items-center justify-between gap-3 rounded-xl border border-gray-200 px-5 py-1 sm:items-start lg:flex-row lg:items-center">
      <div className="flex w-fit flex-col items-center justify-center gap-3 sm:flex-row sm:gap-8">
        <h1 className="p-3 pb-0 text-3xl font-medium sm:pb-3">Messaging</h1>
        <div className="flex w-[14rem] items-center justify-center gap-3 rounded-lg border border-gray-200 px-3 py-2 sm:w-[20rem] md:w-[25rem]">
          <FontAwesomeIcon
            icon={faSearch}
            className="justify-center text-light-main"
          />
          <input
            placeholder="Search messages"
            className="relative w-full items-center justify-center border-none outline-none"
          />
        </div>
      </div>
      <div className="flex gap-4 px-3 md:gap-7">
        <Button className="border border-main bg-white px-2 py-0 text-main hover:bg-main hover:text-white md:py-1">
          Unread
        </Button>
        <Button className="border border-main bg-white px-2 text-main hover:bg-main hover:text-white">
          Starred
        </Button>
      </div>
    </div>
  );
}
export default NavMessage;
