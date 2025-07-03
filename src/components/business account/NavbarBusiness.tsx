import {
  faArrowUpRightFromSquare,
  faBell,
  faGear,
  faMessage,
  faPager,
} from "@fortawesome/free-solid-svg-icons";
import Logo from "../common/Logo";
import UserMenu from "../user settings/UserMenu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
import Button from "../common/Button";
import { useGetBusinessAccountInfoQuery } from "../../services/businessAccountApi";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import SidebarNotifications from "../notifications/SidebarNotifications.tsx";
import { useState } from "react";
import {
  useGetAllNotificationsQuery,
  useMakeNotificationsSeenMutation,
} from "../../services/notificationsApi.ts";

function NavbarBusiness() {
  const companyId = localStorage.getItem("businessAccountId");
  const navigate = useNavigate();
  const { data } = useGetBusinessAccountInfoQuery({
    id: companyId?.toString() || "",
  });
  const { user } = useSelector((state: RootState) => state.user);
  const businessAccount = data?.business;

  const [showSideNav, setShowSideNav] = useState(false);
  const { data: notificationsData, refetch: refetchNotificatins } =
    useGetAllNotificationsQuery();
  const notifications = notificationsData?.notifications;
  const [makeNotificationsSeen] = useMakeNotificationsSeenMutation();

  return (
    <>
      <SidebarNotifications
        setShowSideNav={setShowSideNav}
        showSideNav={showSideNav}
        notifications={notifications ?? []}
      />

      <nav className="flex items-center justify-between gap-2 border-b border-b-gray-100 px-3 py-3 lg:px-6">
        <Logo fontSize="text-4xl" />
        <div className="flex items-center gap-5">
          <div className="flex items-center justify-center">
            <div className="items-center gap-5 pr-4 sm:flex md:pr-10">
              <div
                className="relative cursor-pointer"
                onClick={async () => {
                  setShowSideNav((e) => !e);
                  await makeNotificationsSeen({});
                  refetchNotificatins();
                }}
              >
                <FontAwesomeIcon icon={faBell} className="text-2xl" />
                {(notifications?.filter((n) => !n.isSeen)?.length ?? 0) > 0 && (
                  <div className="absolute bottom-4 left-2 rounded-full bg-danger-300 px-2 py-1 text-xs font-medium text-white">
                    {notifications?.filter((n) => !n.isSeen)?.length ?? 0}
                  </div>
                )}
              </div>

              <Link to="messaging-business">
                <FontAwesomeIcon icon={faMessage} className="text-2xl" />
              </Link>
            </div>
            <div>
              <Button
                onClick={() => {
                  navigate("/");
                }}
                className="border border-main bg-white px-2 text-main hover:bg-main hover:text-white lg:px-5"
              >
                Switch to account
              </Button>
            </div>
          </div>
          <UserMenu type="BusinessAccount">
            <div className="px-3">
              <div className="px-2">
                <p className="text-lg font-medium">{businessAccount?.name}</p>
                <p className="text-gray-300">{businessAccount?.email}</p>
              </div>
              <div className="mt-5 flex flex-col gap-3">
                <Link
                  className="flex items-center justify-between rounded-md px-2 py-2 hover:bg-[#eee]"
                  to=""
                >
                  <div className="flex items-center gap-2">
                    <FontAwesomeIcon icon={faPager} className="text-2xl" />
                    <p className="text-lg font-medium">Company page</p>
                  </div>
                  <FontAwesomeIcon
                    icon={faArrowUpRightFromSquare}
                    className="text-lg text-gray-300"
                  />
                </Link>
                <Link
                  className="flex items-center gap-2 rounded-md px-2 py-2 hover:bg-[#eee]"
                  to={`/businessDashboard/companySettings/companyAccount/${companyId}`}
                >
                  <FontAwesomeIcon icon={faGear} className="text-2xl" />
                  <p className="text-lg font-medium">Employer settings</p>
                </Link>
              </div>
              <div className="my-4 border-t border-t-gray-100">
                <p className="mt-5 text-lg font-medium">
                  {user.first_name} {user.last_name}
                </p>
                <p className="text-gray-300">{user.email}</p>
              </div>
              <div className="mt-5 flex flex-col gap-3">
                <Link
                  className="flex items-center justify-between rounded-md px-2 py-2 hover:bg-[#eee]"
                  to="/"
                >
                  <div className="flex items-center gap-2">
                    <FontAwesomeIcon icon={faPager} className="text-2xl" />
                    <p className="text-lg font-medium">
                      Visit Qaddemly for job seekers
                    </p>
                  </div>
                  <FontAwesomeIcon
                    icon={faArrowUpRightFromSquare}
                    className="text-lg text-gray-300"
                  />
                </Link>
                <Link
                  className="flex items-center gap-2 rounded-md px-2 py-2 hover:bg-[#eee]"
                  to={`/userSettings/profile/personal`}
                >
                  <FontAwesomeIcon icon={faGear} className="text-2xl" />
                  <p className="text-lg font-medium">Account settings</p>
                </Link>
              </div>
            </div>
          </UserMenu>
        </div>
      </nav>
    </>
  );
}

export default NavbarBusiness;
