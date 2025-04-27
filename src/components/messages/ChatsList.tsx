import { useState } from "react";
import Chat from "./Chat";
import StartMessage from "./StartMessage";
import ChatItem from "./ChatItem";
import {
  ChatType,
  IChat,
  IMessage,
} from "../../interfaces/Messages.interfaces.ts";
import {
  useGetAllMessagesOfBusinessQuery,
  useGetAllMessagesOfUserQuery,
} from "../../services/messagesApi.ts";
import { socket } from "../../services/socket.ts";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store.ts";

function ChatsList({
  chats,
  chatType,
}: {
  chats: IChat[];
  chatType: ChatType;
}) {
  const { id: userId } = useSelector((state: RootState) => state.user.user);

  const [selectedChat, setSelectedChat] = useState<IChat | null>(null);
  const [unreadMessages, setUnreadMessages] = useState<IMessage[] | null>(null);
  const [lastMessage, setLastMessage] = useState<IMessage | null>(null);

  const { data: allMessagesOfUser } = useGetAllMessagesOfUserQuery(
    {
      chatId: selectedChat?.id?.toString() ?? "1",
      page: "1",
    },
    {
      skip: !selectedChat?.id || chatType === "BUSINESS",
    },
  );
  const { data: allMessagesOfBusiness } = useGetAllMessagesOfBusinessQuery(
    {
      businessId: selectedChat?.business_id?.toString() || "",
      chatId: selectedChat?.id?.toString() || "1",
    },
    { skip: !selectedChat?.id || chatType === "USER" },
  );

  function handleOpenChat(chat: IChat) {
    setSelectedChat(chat);
    if (chatType === "USER") {
      socket.emit("user_message_seen", {
        chatId: chat.id,
        userId,
        businessId: chat.business_id,
      });
    } else {
      socket.emit("business_seen_message", {
        chatId: chat.id,
        userId: chat.account_id,
        businessId: chat.business_id,
      });
    }
    setUnreadMessages([]);
  }

  return (
    <div
      className={`flex h-full w-full gap-4 rounded-t-xl ${
        selectedChat ? "" : "justify-center"
      }`}
    >
      <div
        className={`max-h-[45rem] w-full flex-col overflow-y-auto rounded-t-xl border-2 border-gray-100 md:flex lg:max-w-md ${
          selectedChat ? "hidden md:flex" : "flex max-w-sm"
        }`}
      >
        {chats.map((chat) => (
          <ChatItem
            key={chat.id}
            chat={chat}
            chatType={chatType}
            unreadMessages={unreadMessages}
            setUnreadMessages={setUnreadMessages}
            lastMessage={lastMessage}
            setLastMessage={setLastMessage}
            isSelected={selectedChat?.id === chat.id}
            onClick={() => handleOpenChat(chat)}
          />
        ))}
      </div>

      <div
        className={`max-h-[45rem] flex-1 ${
          !selectedChat ? "hidden md:block" : "block"
        }`}
      >
        {selectedChat ? (
          <Chat
            key={selectedChat.id}
            chat={selectedChat}
            businessId={selectedChat.business_id}
            chatType={chatType}
            isCloseButton={true}
            onClose={() => setSelectedChat(null)}
            onBack={() => setSelectedChat(null)}
            setLastMessage={setLastMessage}
            messages={
              chatType === "USER"
                ? (allMessagesOfUser?.messages ?? [])
                : (allMessagesOfBusiness?.messages ?? [])
            }
          />
        ) : (
          <StartMessage />
        )}
      </div>
    </div>
  );
}

export default ChatsList;
