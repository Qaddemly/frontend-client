import {
  ChatType,
  IChat,
  IMessage,
} from "../../interfaces/Messages.interfaces.ts";
import { formatTimestampTo12Hour } from "../../utils/helpers.ts";
import {
  useGetAllMessagesOfBusinessQuery,
  useGetAllMessagesOfUserQuery,
} from "../../services/messagesApi.ts";
import Loader from "../common/Loader.tsx";
import { useEffect } from "react";
import { socket } from "../../services/socket.ts";

type ChatItemProps = {
  chat: IChat;
  chatType: ChatType;
  isSelected: boolean;
  onClick: () => void;
  unreadMessages: IMessage[] | null;
  setUnreadMessages: React.Dispatch<React.SetStateAction<IMessage[] | null>>;
  lastMessage: IMessage | null;
  setLastMessage: (message: IMessage | null) => void;
};

function ChatItem({
  chat,
  isSelected,
  onClick,
  chatType,
  unreadMessages,
  setUnreadMessages,
  lastMessage,
  setLastMessage,
}: ChatItemProps) {
  const { data: allMessagesOfUser, isLoading: isLoadingUserMessages } =
    useGetAllMessagesOfUserQuery(
      {
        chatId: chat?.id.toString() || "1",
        page: "1",
      },
      {
        skip: !chat?.id || chatType === "BUSINESS",
      },
    );
  const { data: allMessagesOfBusiness, isLoading: isLoadingBusinessMessages } =
    useGetAllMessagesOfBusinessQuery(
      {
        businessId: chat?.business_id.toString(),
        chatId: chat?.id.toString() || "1",
      },
      { skip: !chat?.id || chatType === "USER" },
    );

  const messages =
    chatType === "USER"
      ? allMessagesOfUser?.messages
      : allMessagesOfBusiness?.messages;

  useEffect(() => {
    setLastMessage(messages?.[messages?.length - 1] ?? null);
  }, [messages, setLastMessage]);

  useEffect(() => {
    if (chatType === "USER" && allMessagesOfUser?.messages) {
      setUnreadMessages(
        allMessagesOfUser.messages.filter(
          (msg) => msg.sent_status === "BUSINESS" && !msg?.is_seen,
        ),
      );
    } else if (chatType === "BUSINESS" && allMessagesOfBusiness?.messages) {
      setUnreadMessages(
        allMessagesOfBusiness.messages.filter(
          (msg) => msg.sent_status === "USER" && !msg?.is_seen,
        ),
      );
    }
  }, [allMessagesOfUser, allMessagesOfBusiness, chatType, setUnreadMessages]);

  useEffect(() => {
    const handleBusinessMessage = (message: IMessage) => {
      setLastMessage({ ...message, created_at: new Date().toISOString() });
      if (!isSelected)
        setUnreadMessages((prev) => [
          ...(prev || []),
          { ...message, created_at: new Date().toISOString() },
        ]);
    };

    const handleUserMessage = (message: IMessage) => {
      setLastMessage({ ...message, created_at: new Date().toISOString() });
      if (!isSelected)
        setUnreadMessages((prev) => [
          ...(prev || []),
          { ...message, created_at: new Date().toISOString() },
        ]);
    };

    if (chatType === "USER") {
      socket.on("business_send_message", handleBusinessMessage);
    } else {
      socket.on("user_send_message", handleUserMessage);
    }

    return () => {
      socket.off("business_send_message", handleBusinessMessage);
      socket.off("user_send_message", handleUserMessage);
    };
  }, [chatType, isSelected, setLastMessage, setUnreadMessages]);

  if (isLoadingUserMessages || isLoadingBusinessMessages) return <Loader />;
  return (
    <button
      onClick={onClick}
      className={`flex w-full cursor-pointer flex-col items-start justify-between border-b border-gray-200 p-6 hover:bg-gray-100 sm:flex-row sm:items-center ${
        isSelected ? "bg-gray-100" : ""
      }`}
    >
      <div className="flex items-center gap-3">
        <img
          src={
            chatType === "USER"
              ? chat?.business?.logo
              : chat?.account?.profile_picture
          }
          alt={
            chatType === "USER"
              ? chat?.business?.name
              : `${chat?.account?.first_name} ${chat?.account?.last_name}`
          }
          className="h-12 w-12 rounded-full object-cover"
        />
        <div className="flex flex-col items-start">
          <h4 className="text-xl font-medium">
            {chatType === "USER"
              ? chat?.business?.name
              : `${chat?.account?.first_name} ${chat?.account?.last_name}`}
          </h4>
          <p className="max-w-[200px] truncate text-base text-gray-500">
            {lastMessage?.sent_status === "USER" &&
              chatType === "USER" &&
              "You: "}
            {lastMessage?.sent_status === "BUSINESS" &&
              chatType === "BUSINESS" &&
              "You: "}
            {lastMessage?.content}
          </p>
        </div>
      </div>
      <div className="flex flex-row items-center gap-3 sm:flex-col sm:gap-1">
        <p className="text-lg font-medium">
          {formatTimestampTo12Hour(lastMessage?.created_at || "")}
        </p>
        <div className="flex items-center gap-1">
          {unreadMessages && unreadMessages?.length > 0 && (
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-main text-base text-white">
              {unreadMessages?.length}
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
