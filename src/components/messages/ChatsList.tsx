import { useState } from "react";
import Chat from "./Chat";
import StartMessage from "./StartMessage";
import ChatItem from "./ChatItem";
import { Chat as ChatType } from "./types";

type ChatsListProps = {
  chats: ChatType[];
};

function ChatsList({ chats }: ChatsListProps) {
  const [selectedChat, setSelectedChat] = useState<ChatType | null>(null);

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
            key={chat.name}
            chat={chat}
            isSelected={selectedChat?.name === chat.name}
            onClick={() => setSelectedChat(chat)}
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
            title={selectedChat.name}
            website={selectedChat.website}
            messages={selectedChat.messages}
            isCloseButton={true}
            onClose={() => setSelectedChat(null)}
            isStarred={selectedChat.isStarred}
            key={selectedChat.name}
            onBack={() => setSelectedChat(null)}
          />
        ) : (
          <StartMessage />
        )}
      </div>
    </div>
  );
}

export default ChatsList;
