import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { formatTimeAgo } from "../../utils/helpers.ts";
import { useMakeNotificationReadMutation } from "../../services/notificationsApi.ts";
import { useGetAllResumeTemplatesQuery } from "../../services/resumeBuilderApi.ts";
import { INotification } from "../../interfaces/Notifications.interfaces.ts";

function SidebarNotifications({
  setShowSideNav,
  showSideNav,
  notifications,
}: {
  setShowSideNav: React.Dispatch<React.SetStateAction<boolean>>;
  showSideNav: boolean;
  notifications: INotification[];
}) {
  const [makeNotificationRead] = useMakeNotificationReadMutation();
  const { refetch } = useGetAllResumeTemplatesQuery();

  return (
    <div
      className={`${showSideNav ? "translate-x-1" : "translate-x-full"} fixed right-0 top-0 z-10 flex h-full w-[30rem] flex-col gap-5 bg-main-dark p-5 text-xl text-white transition-all duration-300 ease-in-out`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p>Notifications</p>
          <p className="cursor-pointer text-sm text-gray-300">
            Mark all as read
          </p>
        </div>
        <FontAwesomeIcon
          icon={faXmark}
          className="cursor-pointer text-3xl"
          onClick={() => setShowSideNav(false)}
        />
      </div>
      {notifications?.map((n) => (
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-5">
            <img
              src={n.business.logo}
              alt="busienss logo"
              className="h-10 w-10 rounded-full"
            />
            <div>
              <p>{n.message}</p>
              <p className="text-xs">{formatTimeAgo(n.createdAt)}</p>
              {!n.isRead && (
                <p
                  onClick={async () => {
                    await makeNotificationRead({ notificationId: n._id });
                    refetch();
                  }}
                  className="cursor-pointer text-xs text-gray-300"
                >
                  Mark as read
                </p>
              )}
            </div>
          </div>
          {!n.isRead && <div className="h-4 w-4 rounded-full bg-main"></div>}
        </div>
      ))}
    </div>
  );
}

export default SidebarNotifications;
