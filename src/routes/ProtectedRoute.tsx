import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useGetUserQuery } from "../services/profileApi";
import { setUser } from "../components/auth/UserSlice";
import { ReactNode, useEffect } from "react";
import Loader from "../components/common/Loader";
import { Navigate, useLocation } from "react-router-dom";
import { useGetUserBusinessesQuery } from "../services/businessAccountApi";
import { setUserBusinessesAccounts } from "../components/business account/BusinessAccountSlice";

function ProtectedRoute({ children }: { children: ReactNode }) {
  const location = useLocation();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  const { data: userData, isLoading: isLoading1, isError } = useGetUserQuery();
  const { data: userBusinesses, isLoading: isLoading2 } =
    useGetUserBusinessesQuery();

  useEffect(() => {
    if (userData) dispatch(setUser(userData.user));
    if (userBusinesses)
      dispatch(setUserBusinessesAccounts(userBusinesses.businesses));
  }, [userData, userBusinesses, dispatch]);

  if (isLoading1 || isLoading2) return <Loader />;
  if (location.pathname !== "/")
    if (!user || isError) return <Navigate to="/login" replace />;

  return <>{children}</>;
}

export default ProtectedRoute;
