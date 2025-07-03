import {
  faCircleArrowLeft,
  faMinus,
  faPaperclip,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import { socket } from "../../services/socket.ts";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store.ts";
import {
  ChatType,
  IChat,
  IMessage,
} from "../../interfaces/Messages.interfaces.ts";
import { formatTimestampTo12Hour } from "../../utils/helpers.ts";
import CheckIcon from "../common/CheckIcon.tsx";
import DoubleCheckIcon from "../common/DoubleCheckIcon.tsx";

type ChatProps = {
  chat: IChat;
  businessId: number;
  messages: IMessage[];
  onBack?: () => void;
  onClose?: () => void;
  isCloseButton?: boolean;
  chatType: ChatType;
  // isStarred?: boolean;
  setLastMessage: (message: IMessage | null) => void;
};

function Chat({
  chat,
  businessId,
  messages,
  onBack,
  onClose,
  isCloseButton = false,
  chatType,
  setLastMessage,
  // isStarred = false,
}: ChatProps) {
  const { id: userId } = useSelector((state: RootState) => state.user.user);
  // const [isStarredState, setIsStarredState] = useState(isStarred);
  const [messageInput, setMessageInput] = useState("");
  const [chatMessages, setChatMessages] = useState(messages);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const messagesContainerRef = useRef<HTMLDivElement | null>(null);

  // TODO: Add API call to update star status
  // const toggleStar = () => {
  // setIsStarredState(!isStarredState);
  // };

  // this useEffect for handle scrolling
  useEffect(() => {
    const scrollToBottom = () => {
      if (messagesContainerRef.current) {
        messagesContainerRef.current.scrollTo({
          top: messagesContainerRef.current.scrollHeight,
          behavior: "smooth",
        });
      }
    };

    const timeout = setTimeout(scrollToBottom, 50);

    return () => clearTimeout(timeout);
  }, [chatMessages]);

  useEffect(() => {
    const handleBusinessSendMessage = (message: IMessage) => {
      console.log("Received message from business:", message);
      setChatMessages((prev) => [
        ...prev,
        {
          ...message,
          is_seen: false,
          is_delivered: false,
          created_at: new Date().toISOString(),
        },
      ]);
      setLastMessage({
        ...message,
        is_seen: false,
        is_delivered: false,
        created_at: new Date().toISOString(),
      });
      socket.emit("user_message_seen", {
        chatId: chat.id,
        userId: chat.account_id,
        businessId: chat.business_id,
      });
    };

    const handleUserSendMessage = (message: IMessage) => {
      console.log("Received message from user:", message);
      setChatMessages((prev) => [
        ...prev,
        {
          ...message,
          is_seen: false,
          is_delivered: false,
          created_at: new Date().toISOString(),
        },
      ]);
      setLastMessage({
        ...message,
        is_seen: false,
        is_delivered: false,
        created_at: new Date().toISOString(),
      });
      socket.emit("business_seen_message", {
        chatId: chat.id,
        userId: chat.account_id,
        businessId: chat.business_id,
      });
    };

    const handleSeenMessage = () => {
      if (chatType === "BUSINESS") console.log(`user seen message`);
      else console.log("business seen message");
      setChatMessages((prev) => {
        return [...prev].map((message) => {
          return { ...message, is_seen: true };
        });
      });
    };

    const handleDeliveredMessage = () => {
      if (chatType === "BUSINESS") console.log(`user delivered message`);
      else console.log("business delivered message");
      setChatMessages((prev) => {
        return [...prev].map((message) => {
          return { ...message, is_delivered: true };
        });
      });
    };

    if (chatType === "USER") {
      socket.on("business_send_message", handleBusinessSendMessage);
      socket.on("business_delivered_message", handleDeliveredMessage);
      socket.on("business_seen_message", handleSeenMessage);
    } else {
      socket.on("user_send_message", handleUserSendMessage);
      socket.on("user_delivered_message", handleDeliveredMessage);
      socket.on("user_message_seen", handleSeenMessage);
    }

    socket.on("my_message_is_delivered", handleDeliveredMessage);

    return () => {
      socket.off("business_send_message", handleBusinessSendMessage);
      socket.off("business_seen_message", handleSeenMessage);
      socket.off("business_delivered_message", handleDeliveredMessage);
      socket.off("user_send_message", handleUserSendMessage);
      socket.off("user_message_seen", handleSeenMessage);
      socket.off("user_delivered_message", handleDeliveredMessage);
      socket.off("my_message_is_delivered", handleDeliveredMessage);
    };
  }, [chat.account_id, chat.business_id, chat.id, chatType, setLastMessage]);

  const handleSendMessage = () => {
    if (messageInput.length > 0) {
      if (chatType === "USER") {
        socket.emit("user_send_message", {
          chatId: chat.id,
          userId,
          businessId,
          content: messageInput,
        });

        const newMessage: IMessage = {
          id: 1,
          business_id: businessId,
          account_id: userId,
          chat_id: chat.id,
          content: messageInput,
          sent_status: "USER",
          is_delivered: false,
          is_seen: false,
          created_at: new Date().toISOString(),
        };
        setChatMessages((prev) => [...prev, newMessage]);
        setLastMessage(newMessage);
      } else {
        socket.emit("business_send_message", {
          chatId: chat.id,
          userId: chat.account_id,
          businessId,
          content: messageInput,
        });

        const newMessage: IMessage = {
          id: 1,
          business_id: businessId,
          account_id: chat.account_id,
          chat_id: chat.id,
          content: messageInput,
          sent_status: "BUSINESS",
          is_delivered: false,
          is_seen: false,
          created_at: new Date().toISOString(),
        };
        setChatMessages((prev) => [...prev, newMessage]);
        setLastMessage(newMessage);
      }
      setMessageInput("");
    }
  };

  // TODO: Implement attachment functionality
  // const handleAttachment = () => {
  //   console.log("Attachment clicked");
  // };

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
          <div>
            <p className="text-xl font-semibold">{`${
              chatType === "USER"
                ? chat?.business?.name
                : `${chat?.account?.first_name} ${chat?.account?.last_name}`
            }`}</p>
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
      <div
        ref={messagesContainerRef}
        className="min-h-96 space-y-5 overflow-y-auto bg-white p-6"
      >
        {chatMessages?.map((msg, i) => (
          <div
            key={i}
            className={`flex items-start gap-4 ${
              (msg?.sent_status === "USER" && chatType === "USER") ||
              (msg.sent_status === "BUSINESS" && chatType === "BUSINESS")
                ? "flex-row-reverse"
                : "justify-start"
            }`}
          >
            <div>
              <img
                src={
                  msg?.sent_status === "USER"
                    ? chat?.account?.profile_picture
                    : chat?.business?.logo
                }
                alt={
                  msg?.sent_status === "USER"
                    ? `${chat?.account?.first_name} ${chat?.account?.last_name}`
                    : chat?.business?.name
                }
                className="h-10 w-10 rounded-full object-cover"
              />
            </div>
            <div className="mt-3 flex flex-col gap-0.5">
              <div
                className={`max-w-xs rounded-2xl px-3 py-1 ${
                  (msg?.sent_status === "USER" && chatType === "USER") ||
                  (msg?.sent_status === "BUSINESS" && chatType === "BUSINESS")
                    ? "bg-gray-600 text-white"
                    : "border border-gray-600 bg-white text-gray-600"
                }`}
              >
                {msg?.content}
              </div>
              <div
                className={`flex items-center gap-2 px-3 py-1 text-xs text-gray-600 ${
                  (msg?.sent_status === "USER" && chatType === "USER") ||
                  (msg?.sent_status === "BUSINESS" && chatType === "BUSINESS")
                    ? "text-right"
                    : "text-left"
                }`}
              >
                {formatTimestampTo12Hour(msg?.created_at)}
                {/* Status handling */}
                {msg?.sent_status === "USER" &&
                  chatType === "USER" &&
                  !msg.is_delivered && <CheckIcon />}
                {msg?.sent_status === "BUSINESS" &&
                  chatType === "BUSINESS" &&
                  !msg.is_delivered && <CheckIcon />}
                {msg?.sent_status === "USER" &&
                  chatType === "USER" &&
                  msg.is_delivered && (
                    <DoubleCheckIcon
                      color={msg.is_seen ? "#52BCE9" : "#1C274C"}
                    />
                  )}
                {msg?.sent_status === "BUSINESS" &&
                  chatType === "BUSINESS" &&
                  msg.is_delivered && (
                    <DoubleCheckIcon
                      color={msg.is_seen ? "#52BCE9" : "#1C274C"}
                    />
                  )}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
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
            onKeyDown={handleKeyPress}
          />
          {/* Buttons */}
          <div className="flex flex-row items-center justify-center gap-4 text-2xl">
            <button
              className="text-gray-600"
              // onClick={handleAttachment}
            >
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
