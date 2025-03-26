import {
  faCircleArrowLeft,
  faMinus,
  faPaperclip,
  faPaperPlane,
  faStar as faStarFilled,
} from "@fortawesome/free-solid-svg-icons";
import { faStar } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import GoogleLogo from "../common/GoogleLogo";
// import { useState } from "react";

type ChatProps = {
  title: string;
  website?: string;
  messages: { text: string; sender: "user" | "business"; time: string }[];
  onBack?: () => void;
  onClose?: () => void;
  isCloseButton?: boolean;
  isStarred?: boolean;
};

function Chat({
  title,
  website,
  messages,
  onBack,
  onClose,
  isCloseButton = false,
  isStarred = false,
}: ChatProps) {
  // const [isStarred, setIsStarred] = useState(isStarred);
  // function toggleStar() {setIsStarred(isStarred);}
  // function handleSendMessage() {// TODO }
  // function handleAttachment() {// TODO }

  return (
    <div className="flex w-full max-w-3xl flex-col rounded-t-xl border-2 border-gray-100">
      {/* Header */}
      <div className="flex flex-row items-center justify-between rounded-t-xl bg-main p-3 text-white">
        <div className="flex flex-row items-center justify-center gap-3">
          <GoogleLogo />
          {/* TODO : Replace with real image with size of 56*56 px  */}
          <div>
            <p className="text-xl font-semibold">{title}</p>
            <p className="text-base opacity-90">{website}</p>
          </div>
        </div>
        {/* Buttons */}
        <div className="flex flex-row items-center justify-center gap-3 text-white">
          <button
          // onClick={toggleStar}
          >
            {isStarred ? (
              <FontAwesomeIcon icon={faStarFilled} className="text-2xl" />
            ) : (
              <FontAwesomeIcon icon={faStar} className="text-2xl" />
            )}
          </button>

          {isCloseButton ? (
            <button
              className="h-6 w-6 rounded-full border-2 border-white text-base"
              onClick={onClose}
            >
              <FontAwesomeIcon icon={faMinus} />
            </button>
          ) : (
            <button onClick={onBack}>
              <FontAwesomeIcon icon={faCircleArrowLeft} className="text-3xl" />
            </button>
          )}
        </div>
      </div>

      {/* Chat Messages */}
      <div className="max-h-[35rem] flex-1 space-y-2 overflow-y-auto bg-white p-6">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex items-center gap-4 ${msg.sender === "user" ? "flex-row-reverse" : "justify-start"}`}
          >
            <div>
              <GoogleLogo />
              {/* TODO : Replace with real image with size of 48*48 px  */}
            </div>
            <div className="flex flex-col gap-0.5">
              <div
                className={`max-w-xs rounded-2xl px-3 py-1 ${
                  msg.sender === "user"
                    ? "bg-gray-600 text-white"
                    : "border border-gray-600 bg-white text-gray-600"
                }`}
              >
                {msg.text}
              </div>
              <div
                className={`px-3 py-1 text-xs text-gray-600 ${
                  msg.sender === "user" ? "text-right" : "text-left"
                }`}
              >
                {/* TODO : Add (sent - Delivered - seen) status */}
                {msg.time}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Input Field */}
      <div className="flex items-center justify-center bg-white p-4 shadow-lg [box-shadow:0_-8px_8px_0_rgba(0,0,0,0.1)]">
        <div className="flex w-full rounded-xl bg-gray-200 px-5 py-1.5">
          <input
            type="text"
            placeholder="Type your message here"
            className="text-md w-full bg-gray-200 text-gray-600 placeholder:text-gray-600 focus:outline-none sm:text-lg"
          />
          {/* Buttons */}
          <div className="flex flex-row items-center justify-center gap-4 text-2xl">
            <button
              className="text-gray-600"
              // onClick={handleAttachment}
            >
              <FontAwesomeIcon icon={faPaperclip} />
            </button>
            <button
              className="text-gray-600"
              // onClick={handleSendMessage}
            >
              <FontAwesomeIcon icon={faPaperPlane} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;

{
  /* <Chat
  onBack={() => {}}
  onClose={() => {}}
  isCloseButton={true}
  title="Google Inc."
  website="www.google.com"
  messages={[
    {
      text: "Hi gvbhjn vybun tvybun ivy buni vybuni",
      sender: "business",
      time: "12:01 PM",
    },
    {
      text: "How are you?  yubn vy buni ybuni y buni buni",
      sender: "user",
      time: "12:02 PM",
    },
    {
      text: "I am fine  nu nim ybunimo bu nimo",
      sender: "business",
      time: "12:03 PM",
    },
    {
      text: "Hello cgvbhjn tvbyuni tvybun vybuni vybu",
      sender: "user",
      time: "12:00 PM",
    },
    {
      text: "Hi gvbhjn vybun tvybun ivy buni vybuni",
      sender: "business",
      time: "12:01 PM",
    },
    {
      text: "How are you?  yubn vy buni ybuni y buni buni",
      sender: "user",
      time: "12:02 PM",
    },
    {
      text: "I am fine  nu nim ybunimo bu nimo",
      sender: "business",
      time: "12:03 PM",
    },
    {
      text: "Hello cgvbhjn tvbyuni tvybun vybuni vybu",
      sender: "user",
      time: "12:00 PM",
    },
    {
      text: "Hi gvbhjn vybun tvybun ivy buni vybuni",
      sender: "business",
      time: "12:01 PM",
    },
  ]}
/>; */
}
