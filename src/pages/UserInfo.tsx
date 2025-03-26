import UserInfoForm from "../components/auth/user-info/UserInfoForm";
import { UserInfoProvider } from "../context/UserInfoContext";

function UserInfo() {
  return (
    <UserInfoProvider>
      <UserInfoForm />
    </UserInfoProvider>
  );
}

export default UserInfo;
