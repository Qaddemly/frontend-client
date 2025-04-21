import {
  faCircleArrowLeft,
  faMinus,
  faPaperclip,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import GoogleLogo from "../common/GoogleLogo";
import { useEffect, useRef, useState } from "react";
import { socket } from "../../services/socket.ts";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store.ts";
import { IChat, IMessage } from "../../interfaces/Messages.interfaces.ts";
import { formatTimestampTo12Hour } from "../../utils/helpers.ts";

type ChatProps = {
  chat: IChat;
  businessId: number;
  messages: IMessage[];
  onBack?: () => void;
  onClose?: () => void;
  isCloseButton?: boolean;
  // isStarred?: boolean;
};

function Chat({
  chat,
  businessId,
  messages,
  onBack,
  onClose,
  isCloseButton = false,
  // isStarred = false,
}: ChatProps) {
  const { id: userId } = useSelector((state: RootState) => state.user.user);
  // const [isStarredState, setIsStarredState] = useState(isStarred);
  const [messageInput, setMessageInput] = useState("");

  // this for handle two times emit
  const hasEmitted = useRef(false);

  useEffect(() => {
    if (!userId || hasEmitted.current) return;

    const handleConnect = () => {
      if (!hasEmitted.current) {
        socket.emit("connect_user", userId);
        hasEmitted.current = true;
      }
    };

    if (socket.connected) {
      handleConnect();
    } else {
      socket.on("connect", handleConnect);
    }

    return () => {
      socket.off("connect", handleConnect);
    };
  }, [userId]);

  // const toggleStar = () => {
  // setIsStarredState(!isStarredState);
  // TODO: Add API call to update star status
  // };

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      // const newMessage: ChatMessage = {
      //   text: messageInput,
      //   sender: "user",
      //   time: new Date().toLocaleTimeString([], {
      //     hour: "2-digit",
      //     minute: "2-digit",
      //   }),
      // };

      socket.emit("user_send_message", {
        chatId: chat.id,
        userId,
        businessId,
        content: messageInput,
      });

      // setChatMessages([...chatMessages, newMessage]);
      setMessageInput("");
    }
  };

  const handleAttachment = () => {
    // TODO: Implement attachment functionality
    console.log("Attachment clicked");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div className="flex h-full w-full flex-col rounded-t-xl border-2 border-gray-100">
      {/* Header */}
      <div className="flex flex-row items-center justify-between rounded-t-xl bg-main p-3 text-white">
        <div className="flex flex-row items-center justify-center gap-3">
          <GoogleLogo />
          <div>
            <p className="text-xl font-semibold">{`${chat?.account?.first_name} ${chat?.account?.last_name}`}</p>
            {/*<p className="text-base opacity-90">{website}</p>*/}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-row items-center justify-center gap-3 text-white">
          {/*<button onClick={toggleStar}>*/}
          {/*  {isStarredState ? (*/}
          {/*    <FontAwesomeIcon icon={faStarFilled} className="text-2xl" />*/}
          {/*  ) : (*/}
          {/*    <FontAwesomeIcon icon={faStar} className="text-2xl" />*/}
          {/*  )}*/}
          {/*</button>*/}

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
      <div className="min-h-96 flex-1 overflow-y-auto bg-white p-6">
        {messages?.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-center gap-4 ${
              msg?.sent_status === "USER" ? "flex-row-reverse" : "justify-start"
            }`}
          >
            <div>
              <GoogleLogo />
            </div>
            <div className="flex flex-col gap-0.5">
              <div
                className={`max-w-xs rounded-2xl px-3 py-1 ${
                  msg?.sent_status === "USER"
                    ? "bg-gray-600 text-white"
                    : "border border-gray-600 bg-white text-gray-600"
                }`}
              >
                {msg?.content}
              </div>
              <div
                className={`px-3 py-1 text-xs text-gray-600 ${
                  msg?.sent_status === "USER" ? "text-right" : "text-left"
                }`}
              >
                {formatTimestampTo12Hour(msg?.created_at)}
                {/* TODO : Add (sent - Delivered - seen) status */}
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
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          {/* Buttons */}
          <div className="flex flex-row items-center justify-center gap-4 text-2xl">
            <button className="text-gray-600" onClick={handleAttachment}>
              <FontAwesomeIcon icon={faPaperclip} />
            </button>
            <button className="text-gray-600" onClick={handleSendMessage}>
              <FontAwesomeIcon icon={faPaperPlane} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;
