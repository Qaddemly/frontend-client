import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ChatsList from "./ChatsList";
import {
  useGetAllChatsOfBusinessQuery,
  useGetAllChatsOfUserQuery,
} from "../../services/messagesApi.ts";
import { ChatType } from "../../interfaces/Messages.interfaces.ts";

function NavMessage({ chatType }: { chatType: ChatType }) {
  const businessId = localStorage.getItem("businessAccountId");
  // const [filter, setFilter] = useState("all");

  const { data: userChats } = useGetAllChatsOfUserQuery();
  const { data: businessChats } = useGetAllChatsOfBusinessQuery({
    businessId: businessId?.toString() || "",
  });

  const chats = chatType === "USER" ? userChats?.chats : businessChats?.chats;

  // const filteredChats = chats.filter((chat) => {
  //   if (filter === "unread") return chat.unreadMessages > 0;
  //   if (filter === "starred") return chat.isStarred;
  //   return true;
  // });

  return (
    <>
      <div className="flex flex-col items-center justify-between gap-3 rounded-xl border border-gray-200 px-5 py-1 sm:items-start lg:flex-row lg:items-center">
        <div className="flex w-fit flex-col items-center justify-center gap-3 sm:flex-row sm:gap-8">
          <h1 className="p-3 pb-0 text-3xl font-medium sm:pb-3">Messaging</h1>
          <div className="flex w-[14rem] items-center justify-center gap-3 rounded-lg border border-gray-200 px-3 py-2 sm:w-[20rem] md:w-[25rem]">
            <FontAwesomeIcon
              icon={faSearch}
              className="justify-center text-light-main"
            />
            <input
              placeholder="Search messages"
              className="relative w-full items-center justify-center border-none outline-none"
            />
          </div>
        </div>
        {/*<div className="flex gap-4 px-3 md:gap-7">*/}
        {/*  <Button*/}
        {/*    onClick={() => setFilter("all")}*/}
        {/*    className="border border-main bg-white px-2 py-0 text-main hover:bg-main hover:text-white focus:bg-main focus:text-white md:py-1"*/}
        {/*  >*/}
        {/*    All*/}
        {/*  </Button>*/}
        {/*  <Button*/}
        {/*    onClick={() => setFilter("unread")}*/}
        {/*    className="border border-main bg-white px-2 py-0 text-main hover:bg-main hover:text-white focus:bg-main focus:text-white md:py-1"*/}
        {/*  >*/}
        {/*    Unread*/}
        {/*  </Button>*/}
        {/*  <Button*/}
        {/*    onClick={() => setFilter("starred")}*/}
        {/*    className="border border-main bg-white px-2 py-0 text-main hover:bg-main hover:text-white focus:bg-main focus:text-white md:py-1"*/}
        {/*  >*/}
        {/*    Starred*/}
        {/*  </Button>*/}
        {/*</div>*/}
      </div>
      <ChatsList chatType={chatType} chats={chats ?? []} />
    </>
  );
}
export default NavMessage;
