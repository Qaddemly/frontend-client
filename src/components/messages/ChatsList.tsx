import { useState } from "react";
import Chat from "./Chat";
import StartMessage from "./StartMessage";
import ChatItem from "./ChatItem";
import { ChatType, IChat } from "../../interfaces/Messages.interfaces.ts";
import {
  useGetAllMessagesOfBusinessQuery,
  useGetAllMessagesOfUserQuery,
} from "../../services/messagesApi.ts";

function ChatsList({
  chats,
  chatType,
}: {
  chats: IChat[];
  chatType: ChatType;
}) {
  const [selectedChat, setSelectedChat] = useState<IChat | null>(null);

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

  const [unreadMessages, setUnreadMessages] = useState(
    chatType === "USER"
      ? allMessagesOfUser?.messages?.filter((msg) => !msg.is_delivered)
      : allMessagesOfBusiness?.messages?.filter((msg) => !msg.is_delivered),
  );

  // console.log(unreadMessages);

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
            unreadMessages={unreadMessages || []}
            isSelected={selectedChat?.id === chat.id}
            onClick={() => {
              setSelectedChat(chat);
              setUnreadMessages([]);
            }}
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
