import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import UserProfileHeader from "../components/user profile/UserProfileHeader";
import UserProfileBody from "../components/user profile/UserProfileBody";
import UserProfileConnections from "../components/user profile/UserProfileConnections";

function UserProfile() {
  const { user } = useSelector((state: RootState) => state.user);

  return (
    <div>
      <UserProfileHeader user={user} />
      <div className="flex">
        <UserProfileBody />
        <UserProfileConnections user={user} />
      </div>
    </div>
  );
}

export default UserProfile;
