import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IUser } from "../../interfaces/Auth.interfaces";
import Button from "../common/Button";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";

function UserProfileHeader({ user }: { user: IUser }) {
  return (
    <div className="bg-light-secondary px-32 py-10">
      {/* Log, Info and Actions */}
      <div className="flex items-center justify-between">
        {/* Logo and Info Section */}
        <div className="flex items-center gap-5">
          <img
            src={user.profile_picture}
            alt="Company Logo"
            className="h-24 w-24 rounded-full border-2 border-white object-cover"
          />
          <div className="flex flex-col gap-1">
            <p className="text-xl font-semibold">
              {user.first_name} {user.last_name}
            </p>
            <p className="text-gray-500">Argentine professional footballer</p>
            <p className="text-gray-500">Miami, USA</p>
          </div>
        </div>
        <div>
          <Button className="flex items-center gap-2 space-x-2 px-3">
            Show Resume
            <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="" />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default UserProfileHeader;
