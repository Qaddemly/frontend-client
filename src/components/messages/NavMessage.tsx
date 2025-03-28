import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../common/Button";

function NavMessage() {
  return (
    <div className="mb-4 flex items-center justify-between rounded-md border border-gray-200">
      <h1 className="p-3 text-2xl font-semibold">Messaging</h1>
      <div className="flex items-center justify-center rounded-md border border-gray-200 px-3">
        <FontAwesomeIcon
          icon={faSearch}
          className="right-3 top-3 justify-center pr-2 text-light-main"
        />
        <input
          placeholder="Search messages"
          className="relative items-center justify-center pr-10"
        />
      </div>
      <div className="flex gap-2">
        <Button className="mx-3 px-2">Unread</Button>
        <Button className="mx-3 px-2">Starred</Button>
      </div>
    </div>
  );
}
export default NavMessage;
