import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { INotification } from "../../interfaces/Notifications.interfaces.ts";
import { addNotification } from "./notificationSlice.ts";
import toast from "react-hot-toast";
import Button from "../common/Button.tsx";
import { useNavigate } from "react-router-dom";
import { useGetBusinessAccountInfoQuery } from "../../services/businessAccountApi.ts";
import { RootState } from "../../store/store.ts";
import { useGetAllNotificationsQuery } from "../../services/notificationsApi.ts";

function SSENotifications() {
  const dispatch = useDispatch();
  const { id } = useSelector((state: RootState) => state.user.user);
  const navigate = useNavigate();
  const [businessId, setBusinessId] = useState<null | number>(null);
  const [notification, setNotification] = useState<INotification | null>(null);

  const { refetch } = useGetAllNotificationsQuery();
  const { data } = useGetBusinessAccountInfoQuery(
    { id: businessId?.toString() || "" },
    { skip: !businessId },
  );
  const businessInfo = data?.business;

  useEffect(() => {
    if (!id) return;

    const eventSource = new EventSource(
      `http://localhost:8000/events?user=${id}`,
    );

    eventSource.onmessage = (event) => {
      const notificationData: INotification = JSON.parse(event.data);
      dispatch(addNotification(notificationData));
      setBusinessId(notificationData.businessId);
      setNotification(notificationData);
      refetch();
    };

    eventSource.onerror = (err) => {
      console.error("SSE Error:", err);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, [dispatch, id]);

  useEffect(() => {
    if (!notification || !businessInfo) return;

    toast.custom(
      (t) => (
        <div
          className={`${
            t.visible
              ? "animate-enterNotification"
              : "animate-leaveNotification"
          } pointer-events-auto mt-12 w-full max-w-md rounded-lg bg-light-secondary shadow-lg`}
        >
          <div className="p-4">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="bg-indigo-100 flex h-10 w-10 items-center justify-center">
                  <img
                    src={businessInfo?.logo}
                    alt={businessInfo?.name}
                    className="rounded-full"
                  />
                </div>
              </div>
              <div className="ml-3 w-0 flex-1">
                <p className="text-gray-900 text-sm font-medium">
                  {notification?.message}
                </p>
                <p className="mt-1 text-sm text-gray-500">
                  {businessInfo?.name} • {businessInfo?.address?.country},{" "}
                  {businessInfo?.address?.city}
                </p>
                {notification.type !== "messageSentToBusiness" && (
                  <div className="mt-3 flex space-x-4">
                    <Button
                      className="px-3"
                      onClick={() => {
                        navigate(`/findJob/jobProfile/${notification?.jobId}`);
                        toast.dismiss(t.id);
                      }}
                    >
                      <span className="flex items-center">View Job</span>
                    </Button>
                    <button
                      onClick={() => toast.dismiss(t.id)}
                      className="hover:bg-gray-50 rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 focus:outline-none"
                    >
                      Dismiss
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ),
      {
        duration: 6000,
        position: "top-right",
      },
    );
  }, [businessInfo, notification]);

  return null;
}

export default SSENotifications;
