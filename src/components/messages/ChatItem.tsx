import { faStar as faStarFilled } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import GoogleLogo from "../common/GoogleLogo";
import { Chat } from "./types";

type MessageItemProps = {
  chat: Chat;
  isSelected: boolean;
  onClick: () => void;
};

function MessageItem({ chat, isSelected, onClick }: MessageItemProps) {
  const lastMessage = chat.messages[chat.messages.length - 1];

  return (
    <button
      onClick={onClick}
      className={`flex w-full cursor-pointer items-center justify-between border-b border-gray-200 p-6 hover:bg-gray-100 ${
        isSelected ? "bg-gray-100" : ""
      }`}
    >
      <div className="flex items-center gap-3">
        <GoogleLogo />
        <div className="flex flex-col items-start">
          <h4 className="text-xl font-medium">{chat.name}</h4>
          <p className="max-w-[200px] truncate text-base text-gray-500">
            {lastMessage.sender === "user" && "You: "}
            {lastMessage.text}
          </p>
        </div>
      </div>
      <div className="flex flex-col items-center gap-1">
        <p className="text-lg font-medium">{lastMessage.time}</p>
        <div className="flex items-center gap-1">
          {chat.unreadMessages > 0 && (
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-main text-base text-white">
              {chat.unreadMessages}
            </span>
          )}
          {chat.isStarred && (
            <FontAwesomeIcon
              icon={faStarFilled}
              className="h-6 w-6 text-yellow"
            />
          )}
        </div>
      </div>
    </button>
  );
}

export default MessageItem;
