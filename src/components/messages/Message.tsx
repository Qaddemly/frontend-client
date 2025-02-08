import Button from "../common/Button";
import Input from "../common/Input";
import InputField from "../common/InputField";
import { faMagnifyingGlass, faUser } from "@fortawesome/free-solid-svg-icons";
// import NavProfile from "../profile/NavProfile";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Message() {
  return (
    <div>
      {/* <NavProfile /> */}
      <div>
        <p className="ml-8 mt-5 text-3xl font-semibold">Messages</p>
        <p className="ml-10 mt-2">The best way to communicate</p>
        <div className="ml-8 mt-5">
          <Button className="space-x-2 rounded-none px-3 hover:bg-white hover:text-gray-800">
            Inbox
          </Button>
          <Button className="rounded-none bg-white px-3 text-gray-800 hover:bg-light-main hover:text-white">
            Unread
          </Button>
          <div className="mt-5 flex">
            <InputField id="firstName" icon={faMagnifyingGlass}>
              <Input
                icon={faMagnifyingGlass}
                props={{
                  placeholder: "Find Job Message",
                  type: "text",
                  id: "firstName",
                }}
              />
            </InputField>
          </div>
          <div className="block space-y-2">
            <Button className="mx-5 mt-5 bg-light-main px-2 text-gray-800">
              UserName
              <FontAwesomeIcon
                icon={faUser}
                className="ml-5 rounded-full border-2 border-gray-200 bg-gray-200 px-2 py-2"
              />
            </Button>
          </div>
          <div>
            <Button className="mx-5 my-5 bg-light-main px-2 text-gray-800">
              UserName
              <FontAwesomeIcon
                icon={faUser}
                className="ml-5 rounded-full border-2 border-gray-200 bg-gray-200 px-2 py-2"
              />
            </Button>
          </div>
          <div>
            <Button className="mx-5 bg-light-main px-2 text-gray-800">
              UserName
              <FontAwesomeIcon
                icon={faUser}
                className="ml-5 rounded-full border-2 border-gray-200 bg-gray-200 px-2 py-2"
              />
            </Button>
          </div>
        </div>
      </div>
      <div className="flex">
        <img src="/assets/image.png" />
        <p>Welcome to messages</p>
      </div>
    </div>
  );
}

export default Message;
