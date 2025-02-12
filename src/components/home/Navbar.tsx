import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../../store/store";
import UserMenu from "../user settings/UserMenu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookmark,
  faFileLines,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import Logo from "../common/Logo";
import { useGetUserBusinessesQuery } from "../../services/businessAccountApi";
import { useRef, useState } from "react";
import Button from "../common/Button";
import { useClickOutside } from "../../hooks/useOutsideClick";
import BusinessAccountsMenu from "../business account/BusinessAccountsMenu";
import NavbarLink from "../common/NavbarLink";

function Navbar() {
  const { user } = useSelector((state: RootState) => state.user);
  const { data } = useGetUserBusinessesQuery(undefined, {
    skip: Object.entries(user).length === 0,
  }); // this api can handled with getMe api instead (ask backend)
  const [showMenu, setShowMenu] = useState(false);
  const divRef = useRef<HTMLDivElement>(null);
  const menuRef = useClickOutside<HTMLUListElement>(
    () => setShowMenu(false),
    divRef,
  );

  return (
    <>
      <nav className="flex items-center justify-between border-b border-b-gray-100 bg-white px-6 py-3">
        <Logo fontSize="text-4xl" />
        <div>
          <ul className="flex items-center justify-between space-x-8">
            <li>
              <NavbarLink to="/" content="Home" />
            </li>
            <li>
              <NavbarLink to="/findJob" content="Find job" />
            </li>
            <li>
              <NavbarLink to="/findCompany" content="Find company" />
            </li>
          </ul>
        </div>
        {!user.is_activated ? (
          <div className="flex space-x-2">
            <Link
              to="/signup"
              className="rounded-md border border-main px-6 py-2 text-main hover:bg-main hover:text-white"
            >
              Sign up
            </Link>
            <Link
              to="/login"
              className="rounded-md border bg-main px-6 py-2 text-white hover:border-main hover:bg-white hover:text-main"
            >
              Log in
            </Link>
          </div>
        ) : (
          <div className="relative flex items-center gap-10">
            <div>
              <Button
                onClick={() => setShowMenu((s) => !s)}
                className="border border-main bg-white px-5 text-main hover:bg-main hover:text-white"
              >
                Business
              </Button>
              {showMenu && (
                <BusinessAccountsMenu
                  menuRef={menuRef}
                  data={data?.businesses ?? []}
                />
              )}
            </div>
            <UserMenu type="NormalAccount">
              <div className="mt-2 flex flex-col gap-3">
                <div className="px-3 pb-2">
                  <p className="font-medium">{user.email}</p>
                </div>
                <Link
                  to="/userSettings/profile/personal"
                  className="rounded-md hover:bg-[#eee]"
                >
                  <div className="flex items-center gap-5 px-3 py-2">
                    <FontAwesomeIcon icon={faUser} className="text-lg" />
                    <span className="text-lg font-medium">Profile</span>
                  </div>
                </Link>
                <Link
                  to="/userSettings/resumes"
                  className="rounded-md hover:bg-[#eee]"
                >
                  <div className="flex items-center gap-5 px-3 py-2">
                    <FontAwesomeIcon icon={faFileLines} className="text-lg" />
                    <span className="text-lg font-medium">Resumes</span>
                  </div>
                </Link>
                <Link
                  to="/userSettings/saved-jobs"
                  className="rounded-md hover:bg-[#eee]"
                >
                  <div className="flex items-center gap-5 px-3 py-2">
                    <FontAwesomeIcon icon={faBookmark} className="text-lg" />
                    <span className="text-lg font-medium">Saved Jobs</span>
                  </div>
                </Link>
              </div>
            </UserMenu>
          </div>
        )}
      </nav>
    </>
  );
}
export default Navbar;
