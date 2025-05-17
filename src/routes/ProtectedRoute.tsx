import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useGetUserQuery } from "../services/profileApi";
import { setUser } from "../components/auth/UserSlice";
import { ReactNode, useEffect, useRef } from "react";
import { Navigate, useLocation } from "react-router-dom";
import SSENotifications from "../components/notifications/SSENotifications.tsx";
import { socket } from "../services/socket.ts";

function ProtectedRoute({ children }: { children: ReactNode }) {
  const location = useLocation();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  const { data, isError } = useGetUserQuery();

  // this for handle two times emit
  const hasEmitted = useRef(false);

  useEffect(() => {
    if (!data?.user?.id || hasEmitted.current) return;
    dispatch(setUser(data.user));

    const handleConnect = () => {
      if (!hasEmitted.current) {
        socket.emit("connect_user", data.user.id);
        hasEmitted.current = true;
      }
    };

    if (socket.connected) {
      handleConnect();
    } else {
      socket.once("connect", handleConnect);
    }

    return () => {
      socket.off("connect", handleConnect);
    };
  }, [data?.user?.id]);

  if (location.pathname !== "/")
    if (!user || isError) return <Navigate to="/login" replace />;

  return (
    <>
      <SSENotifications />
      {children}
    </>
  );
}

export default ProtectedRoute;
