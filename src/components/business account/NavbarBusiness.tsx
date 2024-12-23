import {
  faArrowUpRightFromSquare,
  faBell,
  faEnvelope,
  faGear,
  faPager,
} from "@fortawesome/free-solid-svg-icons";
import Logo from "../common/Logo";
import UserMenu from "../profile/UserMenu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

function NavbarBusiness() {
  return (
    <nav className="flex justify-between border-b border-b-gray-100 px-6 py-3">
      <Logo fontSize="text-4xl" />
      <div className="flex items-center gap-2">
        <div className="flex gap-5 pr-10">
          <Link to="" className="flex gap-2">
            <FontAwesomeIcon icon={faBell} className="text-2xl" />
            <p>Notifications</p>
          </Link>
          <Link to="" className="flex gap-2">
            <FontAwesomeIcon icon={faEnvelope} className="text-2xl" />
            <p>Messages</p>
          </Link>
          {/* TODO for GAD : put "Switch to your account" button  */}
        </div>
        <UserMenu type="BusinessAccount">
          <div className="px-3">
            <div className="px-2">
              <p className="text-lg font-medium">Business Company Name</p>
              <p className="text-gray-300">business@email.com</p>
            </div>
            <div className="mt-5 flex flex-col gap-3">
              <Link
                className="flex items-center justify-between rounded-md px-2 py-2 hover:bg-[#eee]"
                to=""
              >
                <div className="flex items-center gap-2">
                  <FontAwesomeIcon icon={faPager} className="text-2xl" />
                  <p className="text-lg font-medium">Company page</p>
                </div>
                <FontAwesomeIcon
                  icon={faArrowUpRightFromSquare}
                  className="text-lg text-gray-300"
                />
              </Link>
              <Link
                className="flex items-center gap-2 rounded-md px-2 py-2 hover:bg-[#eee]"
                to=""
              >
                <FontAwesomeIcon icon={faGear} className="text-2xl" />
                <p className="text-lg font-medium">Employer settings</p>
              </Link>
            </div>
            <div className="my-4 border-t border-t-gray-100">
              <p className="mt-2 text-gray-300">userName@gmail.com</p>
            </div>
            <div className="mt-5 flex flex-col gap-3">
              <Link
                className="flex items-center justify-between rounded-md px-2 py-2 hover:bg-[#eee]"
                to=""
              >
                <div className="flex items-center gap-2">
                  <FontAwesomeIcon icon={faPager} className="text-2xl" />
                  <p className="text-lg font-medium">
                    Visit Qaddemly for job seekers
                  </p>
                </div>
                <FontAwesomeIcon
                  icon={faArrowUpRightFromSquare}
                  className="text-lg text-gray-300"
                />
              </Link>
              <Link
                className="flex items-center gap-2 rounded-md px-2 py-2 hover:bg-[#eee]"
                to=""
              >
                <FontAwesomeIcon icon={faGear} className="text-2xl" />
                <p className="text-lg font-medium">Account settings</p>
              </Link>
            </div>
          </div>
        </UserMenu>
      </div>
    </nav>
  );
}

export default NavbarBusiness;
