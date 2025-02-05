import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useGetUserQuery } from "../services/profileApi";
import { setUser } from "../components/auth/UserSlice";
import { ReactNode, useEffect } from "react";
import Loader from "../components/common/Loader";
import { Navigate, useLocation } from "react-router-dom";

function ProtectedRoute({ children }: { children: ReactNode }) {
  const location = useLocation();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  const { data, isLoading, isError } = useGetUserQuery();

  useEffect(() => {
    if (data) {
      dispatch(setUser(data.user));
    }
    // dispatch(setUserBusinessesAccounts(data?.user.business_roles ?? []));
  }, [data, dispatch]);

  if (isLoading) return <Loader />;
  if (location.pathname !== "/")
    if (!user || isError) return <Navigate to="/login" replace />;

  return <>{children}</>;
}

export default ProtectedRoute;
