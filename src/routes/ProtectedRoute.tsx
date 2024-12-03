import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useGetUserQuery } from "../services/profileApi";
import { setUser } from "../components/auth/UserSlice";
import { ReactNode, useEffect } from "react";
import Loader from "../components/common/Loader";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }: { children: ReactNode }) {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  const { data, isLoading, isError } = useGetUserQuery();

  useEffect(() => {
    if (data) dispatch(setUser(data.user));
  }, [data, dispatch]);

  if (isLoading) return <Loader />;
  if (!user || isError) return <Navigate to="/login" replace />;

  return <>{children}</>;
}

export default ProtectedRoute;
