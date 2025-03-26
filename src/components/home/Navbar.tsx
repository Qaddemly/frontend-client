import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { RootState } from "../../store/store";
import UserMenu from "../user settings/UserMenu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faBookmark,
  faFileLines,
  faTimes,
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
  const { resumeId } = useParams();
  const { user } = useSelector((state: RootState) => state.user);
  const { data } = useGetUserBusinessesQuery(undefined, {
    skip: Object.entries(user).length === 0,
  }); // this api can be handled with getMe api instead (ask backend)
  const [showMenu, setShowMenu] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const divRef = useRef<HTMLDivElement>(null);
  const menuRef = useClickOutside<HTMLUListElement>(
    () => setShowMenu(false),
    divRef,
  );

  return (
    <>
      <nav className="flex w-full items-center justify-between border-b border-gray-200 bg-white px-6 py-3 lg:px-10">
        <Logo className="text-3xl font-medium text-main lg:text-4xl" />
        <div className="hidden lg:flex">
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
            <li>
              <NavbarLink
                to={["/jobTracker", "/jobTracker/archived"]}
                content="Job Tracker"
              />
            </li>
            <li>
              <NavbarLink
                to={["/resumeBuilder", `/resumeBuilder/edit/${resumeId}`]}
                content="Build Resume"
              />
            </li>
          </ul>
        </div>
        <button
          className="lg:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <FontAwesomeIcon
            icon={mobileMenuOpen ? faTimes : faBars}
            className="text-2xl text-main"
          />
        </button>
        {mobileMenuOpen && (
          <div className="absolute left-0 top-14 w-full bg-white shadow-lg lg:hidden">
            <ul className="flex flex-col space-y-4 p-4">
              <li>
                <NavbarLink to="/" content="Home" />
              </li>
              <li>
                <NavbarLink to="/findJob" content="Find job" />
              </li>
              <li>
                <NavbarLink to="/findCompany" content="Find company" />
              </li>
              <li>
                <NavbarLink to="/resumeBuilder" content="Build Resume" />
              </li>
              <li>
                <Button
                  onClick={() => setShowMenu((s) => !s)}
                  className="border border-main bg-white px-2 text-sm text-main hover:bg-main hover:text-white lg:px-5 lg:text-base"
                >
                  Business
                </Button>
                {showMenu && (
                  <BusinessAccountsMenu
                    menuRef={menuRef}
                    data={data?.businesses ?? []}
                  />
                )}
              </li>
              {!user.is_activated && (
                <div className="flex flex-col space-y-2">
                  <Link
                    to="/signup"
                    className="rounded-lg border border-main px-6 py-2 text-center text-main hover:bg-main hover:text-white"
                  >
                    Sign up
                  </Link>
                  <Link
                    to="/login"
                    className="rounded-lg border bg-main px-6 py-2 text-center text-white hover:border-main hover:bg-white hover:text-main"
                  >
                    Log in
                  </Link>
                </div>
              )}
            </ul>
          </div>
        )}
        {!user.is_activated ? (
          <div className="hidden space-x-2 lg:flex">
            <Link
              to="/signup"
              className="rounded-lg border border-main px-6 py-2 text-main hover:bg-main hover:text-white"
            >
              Sign up
            </Link>
            <Link
              to="/login"
              className="rounded-lg border bg-main px-6 py-2 text-white hover:border-main hover:bg-white hover:text-main"
            >
              Log in
            </Link>
          </div>
        ) : (
          <div className="relative flex items-center gap-10">
            <div className="hidden lg:block">
              <Button
                onClick={() => setShowMenu((s) => !s)}
                className="border border-main bg-white px-2 text-sm text-main hover:bg-main hover:text-white lg:px-5 lg:text-base"
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
                  className="rounded-lg hover:bg-[#eee]"
                >
                  <div className="flex items-center gap-5 px-3 py-2">
                    <FontAwesomeIcon icon={faUser} className="text-lg" />
                    <span className="text-lg font-medium">Profile</span>
                  </div>
                </Link>
                <Link
                  to="/userSettings/resumes"
                  className="rounded-lg hover:bg-[#eee]"
                >
                  <div className="flex items-center gap-5 px-3 py-2">
                    <FontAwesomeIcon icon={faFileLines} className="text-lg" />
                    <span className="text-lg font-medium">Resumes</span>
                  </div>
                </Link>
                <Link
                  to="/userSettings/saved-jobs"
                  className="rounded-lg hover:bg-[#eee]"
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
