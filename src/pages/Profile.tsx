import { Outlet } from "react-router-dom";
import UserProfileHeader from "../components/profile/UserProfileHeader";

function Profile() {
  return (
    <>
      <UserProfileHeader />
      <Outlet />
    </>
  );
}

export default Profile;
