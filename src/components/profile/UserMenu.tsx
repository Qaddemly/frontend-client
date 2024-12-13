import {
  faBell,
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
import { IError } from "../../interfaces/Auth.interfaces";
import Loader from "../common/Loader";
import { ReactNode, useRef, useState } from "react";

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
  const [logout, { isLoading }] = useLogoutMutation();
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      const res = await logout().unwrap();
      toast.success(res.message);
      navigate("/login");
    } catch (err) {
      const error = err as IError;
      toast.error(error.data.message);
    }
  }
  return (
    <>
      {isLoading && <Loader />}
      <div
        className="relative flex items-center space-x-5"
        onClick={() => setShowMenu((s) => !s)}
        ref={divRef}
      >
        {type === "NormalAccount" && (
          <FontAwesomeIcon icon={faBell} className="text-2xl" />
        )}
        {!user.profilePicture ? (
          <FontAwesomeIcon
            icon={faUser}
            className="rounded-full border-2 border-gray-200 bg-gray-200 px-2 py-2 text-2xl"
          />
        ) : (
          <img src={user.profilePicture} className="h-12 w-12 rounded-full" />
        )}
        <div className="cursor-pointer text-xl font-semibold">
          {user.firstName} {user.lastName}
        </div>
        {!showMenu ? (
          <FontAwesomeIcon icon={faChevronDown} />
        ) : (
          <FontAwesomeIcon icon={faChevronUp} />
        )}
      </div>
      {showMenu && (
        <div
          ref={menuRef}
          className={`absolute right-6 top-[4.3rem] z-10 flex ${type === "NormalAccount" ? "w-[18rem]" : "w-[24rem]"} flex-col justify-between rounded-md border bg-white py-2 text-gray-800 shadow-md`}
        >
          {children}
          <Button
            onClick={handleLogout}
            className="bg-danger-300 hover:bg-danger-200 m-3"
          >
            Logout
          </Button>
        </div>
      )}
    </>
  );
}

export default UserMenu;
