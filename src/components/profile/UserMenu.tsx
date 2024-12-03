import {
  faBell,
  faChevronDown,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../../store/store";

function UserMenu() {
  const { user } = useSelector((state: RootState) => state.user);
  return (
    <div className="flex items-center space-x-5">
      <FontAwesomeIcon icon={faBell} className="text-2xl" />
      <FontAwesomeIcon
        icon={faUser}
        className="rounded-full border-2 border-gray-200 bg-gray-200 px-2 py-2 text-xl"
      />
      <Link to="/profile/personal" className="text-2xl font-semibold">
        {user.firstName} {user.lastName}
      </Link>
      <FontAwesomeIcon icon={faChevronDown} />
    </div>
  );
}

export default UserMenu;
