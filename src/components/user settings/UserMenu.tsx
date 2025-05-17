import {
  faChevronDown,
  faChevronUp,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../store/store";
import Button from "../common/Button";
import { useClickOutside } from "../../hooks/useOutsideClick";
import { useLogoutMutation } from "../../services/authApi";
import toast from "react-hot-toast";
import { ReactNode, useRef, useState } from "react";
import { handleApiError } from "../../utils/helpers";
import { socket } from "../../services/socket.ts";

type UserMenuProps = {
  children: ReactNode;
  type: "NormalAccount" | "BusinessAccount";
};

function UserMenu({ children, type }: UserMenuProps) {
  const { user } = useSelector((state: RootState) => state.user);
  const [showMenu, setShowMenu] = useState(false);
  const divRef = useRef<HTMLDivElement>(null);
  const menuRef = useClickOutside<HTMLDivElement>(
    () => setShowMenu(false),
    divRef,
  );
  const [logout] = useLogoutMutation();
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      const res = await logout().unwrap();
      toast.success(res.message);
      navigate("/login");
      socket.disconnect();
    } catch (err) {
      handleApiError(err);
    }
  }
  return (
    <>
      <div
        className="relative flex items-center space-x-5"
        onClick={() => setShowMenu((s) => !s)}
        ref={divRef}
      >
        {user.profile_picture === "undefined" ? (
          <FontAwesomeIcon
            icon={faUser}
            className="rounded-full border-2 border-gray-200 bg-gray-200 px-2 py-2 text-xl"
          />
        ) : (
          <img
            src={user?.profile_picture}
            alt="user profile picture"
            className="h-10 w-10 cursor-pointer rounded-full object-cover"
            onClick={(e) => {
              e.stopPropagation();
              navigate("/userProfile");
            }}
          />
        )}
        <div className="hidden cursor-pointer text-xl font-semibold lg:block">
          {user.first_name} {user.last_name}
        </div>
        <span className="hidden sm:block">
          {!showMenu ? (
            <FontAwesomeIcon icon={faChevronDown} />
          ) : (
            <FontAwesomeIcon icon={faChevronUp} />
          )}
        </span>
      </div>
      {showMenu && (
        <div
          ref={menuRef}
          className={`absolute top-[4.3rem] z-10 flex sm:right-6 ${type === "NormalAccount" ? "w-[14rem] md:w-[18rem]" : "w-[20rem] md:w-[24rem]"} flex-col justify-between rounded-md border bg-white py-2 text-gray-800 shadow-md`}
        >
          {children}
          <Button
            onClick={handleLogout}
            className="m-3 bg-danger-300 hover:bg-danger-200"
          >
            Logout
          </Button>
        </div>
      )}
    </>
  );
}

export default UserMenu;
