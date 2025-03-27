import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import Chat from "./Chat";
import StartMessage from "./StartMessage";

function ListMessage() {
  const [selectedChat, setSelectedChat] = useState<string | null>(null);

  const chatMessages: {
    text: string;
    sender: "user" | "business";
    time: string;
  }[] = [
    {
      text: "Hello, how can we help you?",
      sender: "business",
      time: "10:00 AM",
    },
    {
      text: "I need some information.",
      sender: "user",
      time: "10:02 AM",
    },
    {
      text: "Sure! Please tell us what you need.",
      sender: "business",
      time: "10:03 AM",
    },
  ];

  return (
    <>
      <div className="w-1/3 overflow-y-auto pr-4">
        <div className="h-full space-y-2 rounded-md border border-gray-200">
          <button
            onClick={() => setSelectedChat("Google Inc.")}
            className="flex w-full cursor-pointer items-center justify-between border-b border-gray-200 p-3 hover:bg-gray-100 hover:p-3"
          >
            <div className="rounded-full bg-light-secondary p-2">
              <img
                src="https://www.google.com/favicon.ico"
                alt="Google"
                className="h-8 w-8"
              />
            </div>
            <div className="flex-1">
              <div className="font-medium">Google Inc.</div>
              <div className="text-sm text-gray-500">You: what about me?</div>
            </div>
            <div className="text-gray-900 text-sm font-semibold">8:03 PM</div>
          </button>

          <button
            onClick={() => setSelectedChat("Microsoft")}
            className="flex w-full cursor-pointer items-center border-b border-gray-200 p-3 hover:bg-gray-100"
          >
            <div className="rounded-full bg-light-secondary p-2">
              <img
                src="https://www.google.com/favicon.ico"
                alt="Microsoft"
                className="h-8 w-8"
              />
            </div>
            <div className="flex-1">
              <div className="font-medium">Microsoft</div>
              <div className="text-sm text-gray-500">You: My name is Messi</div>
            </div>
            <div className="flex items-center gap-1">
              <div className="text-gray-900 text-sm font-semibold">
                Yesterday
              </div>
              <FontAwesomeIcon icon={faStar} className="h-4 w-4 text-yellow" />
            </div>
          </button>

          <button
            onClick={() => setSelectedChat("Meta")}
            className="relative flex w-full cursor-pointer items-center p-3 hover:bg-gray-100"
          >
            <div className="rounded-full bg-light-secondary p-2">
              <img
                src="https://www.google.com/favicon.ico"
                alt="Meta"
                className="h-8 w-8"
              />
            </div>
            <div className="flex-1">
              <div className="font-medium">Meta</div>
              <div className="text-sm text-gray-500">We gave you our offer</div>
            </div>
            <div className="text-gray-900 pb-3 text-sm font-semibold">
              Mar 2
            </div>
            <div className="absolute bottom-2 right-2 flex h-5 w-5 items-center justify-center rounded-full bg-main text-xs text-white">
              1
            </div>
          </button>
        </div>
      </div>
      <div className="flex flex-1 items-stretch">
        {selectedChat ? (
          <Chat
            title={selectedChat}
            website={`www.${selectedChat.toLowerCase().replace(" ", "")}.com`}
            messages={chatMessages}
            isCloseButton={true}
            onClose={() => setSelectedChat(null)}
          />
        ) : (
          <StartMessage />
        )}
      </div>
    </>
  );
}
export default ListMessage;
