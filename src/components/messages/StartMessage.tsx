import { faMessage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function StartMessage() {
  return (
    <div className="flex h-full flex-1 items-center justify-center rounded-md border border-gray-200">
      <div className="relative p-16">
        <FontAwesomeIcon
          icon={faMessage}
          className="text-[10rem] text-gray-200 opacity-50 sm:text-[12rem] md:text-[25rem]"
        />
        <p className="absolute inset-0 flex items-center justify-center text-xs text-gray-400 sm:text-base md:text-3xl">
          Start sending messages
        </p>
      </div>
    </div>
  );
}
export default StartMessage;
