import { Outlet } from "react-router-dom";
import ProfileHeader from "./ProfileHeader";

function Profile() {
  return (
    <>
      <ProfileHeader />
      <Outlet />
    </>
  );
}

export default Profile;
