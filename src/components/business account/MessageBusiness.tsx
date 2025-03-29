import NavMessage from "../messages/NavMessage";
import ListMessage from "../messages/ListMessages";
import NavbarBusiness from "./NavbarBusiness";
import SideNavBusiness from "./SideNavBusiness";

function MessagingBusiness() {
  return (
    <>
      <div className=" ">
        <NavbarBusiness />
      </div>
      <div className="flex h-screen">
        <SideNavBusiness />

        <div className="flex w-full flex-col p-6">
          <NavMessage />

          <div className="mt-4 flex h-full flex-col overflow-hidden rounded-lg bg-white shadow-lg">
            <div className="shado flex h-screen w-full flex-1 rounded-xl border border-gray-200 bg-white p-4">
              <ListMessage />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MessagingBusiness;
