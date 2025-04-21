import GoogleLogo from "../common/GoogleLogo";
import { IChat, IMessage } from "../../interfaces/Messages.interfaces.ts";
import { formatTimestampTo12Hour } from "../../utils/helpers.ts";

type ChatItemProps = {
  chat: IChat;
  messages: IMessage[];
  isSelected: boolean;
  onClick: () => void;
};

function ChatItem({ chat, isSelected, onClick, messages }: ChatItemProps) {
  const lastMessage = messages[messages.length - 1];
  const unreadMessages = messages.filter((msg) => !msg.is_read);

  return (
    <button
      onClick={onClick}
      className={`flex w-full cursor-pointer flex-col items-start justify-between border-b border-gray-200 p-6 hover:bg-gray-100 sm:flex-row sm:items-center ${
        isSelected ? "bg-gray-100" : ""
      }`}
    >
      <div className="flex items-center gap-3">
        <GoogleLogo />
        <div className="flex flex-col items-start">
          <h4 className="text-xl font-medium">
            {chat?.account?.first_name} {chat?.account?.last_name}
          </h4>
          <p className="max-w-[200px] truncate text-base text-gray-500">
            {lastMessage.sent_status === "USER" && "You: "}
            {lastMessage.content}
          </p>
        </div>
      </div>
      <div className="flex flex-row items-center gap-3 sm:flex-col sm:gap-1">
        <p className="text-lg font-medium">
          {formatTimestampTo12Hour(lastMessage.created_at)}
        </p>
        <div className="flex items-center gap-1">
          {unreadMessages.length > 0 && (
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-main text-base text-white">
              {unreadMessages.length}
            </span>
          )}
          {/*{chat.isStarred && (*/}
          {/*  <FontAwesomeIcon*/}
          {/*    icon={faStarFilled}*/}
          {/*    className="h-6 w-6 text-yellow"*/}
          {/*  />*/}
          {/*)}*/}
        </div>
      </div>
    </button>
  );
}

export default ChatItem;
