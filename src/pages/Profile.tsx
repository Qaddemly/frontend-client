import { Outlet } from "react-router-dom";
import UserProfileHeader from "../components/user settings/UserProfileHeader";

function Profile() {
  return (
    <>
      <UserProfileHeader />
      <Outlet />
    </>
  );
}

export default Profile;
