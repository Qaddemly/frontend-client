import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useGetUserQuery } from "../services/profileApi";
import { setUser } from "../components/auth/UserSlice";
import { ReactNode, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import SSENotifications from "../components/notifications/SSENotifications.tsx";

function ProtectedRoute({ children }: { children: ReactNode }) {
  const location = useLocation();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  const { data, isError } = useGetUserQuery();

  useEffect(() => {
    if (data) {
      dispatch(setUser(data.user));
    }
    // dispatch(setUserBusinessesAccounts(data?.user.business_roles ?? []));
  }, [data, dispatch]);

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
