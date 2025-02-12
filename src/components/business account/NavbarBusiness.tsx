import {
  faArrowUpRightFromSquare,
  faBell,
  faEnvelope,
  faGear,
  faPager,
} from "@fortawesome/free-solid-svg-icons";
import Logo from "../common/Logo";
import UserMenu from "../user settings/UserMenu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate, useParams } from "react-router-dom";
import Button from "../common/Button";
import { useGetBusinessAccountInfoQuery } from "../../services/businessAccountApi";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

function NavbarBusiness() {
  const { companyId } = useParams();
  const navigate = useNavigate();
  const { data } = useGetBusinessAccountInfoQuery({
    id: companyId?.toString() || "",
  });
  const { user } = useSelector((state: RootState) => state.user);
  const businessAccount = data?.business;

  return (
    <nav className="flex justify-between border-b border-b-gray-100 px-6 py-3">
      <Logo fontSize="text-4xl" />
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-5 pr-10">
          <Link to="" className="flex gap-2">
            <FontAwesomeIcon icon={faBell} className="text-2xl" />
            <p>Notifications</p>
          </Link>
          <Link to="" className="flex gap-2">
            <FontAwesomeIcon icon={faEnvelope} className="text-2xl" />
            <p>Messages</p>
          </Link>
          <div>
            <Button
              onClick={() => navigate("/")}
              className="border border-main bg-white px-5 text-main hover:bg-main hover:text-white"
            >
              Switch to your account
            </Button>
          </div>
        </div>
        <UserMenu type="BusinessAccount">
          <div className="px-3">
            <div className="px-2">
              <p className="text-lg font-medium">{businessAccount?.name}</p>
              <p className="text-gray-300">{businessAccount?.email}</p>
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
                to={`/businessDashboard/companySettings/companyAccount/${companyId}`}
              >
                <FontAwesomeIcon icon={faGear} className="text-2xl" />
                <p className="text-lg font-medium">Employer settings</p>
              </Link>
            </div>
            <div className="my-4 border-t border-t-gray-100">
              <p className="mt-5 text-lg font-medium">
                {user.first_name} {user.last_name}
              </p>
              <p className="text-gray-300">{user.email}</p>
            </div>
            <div className="mt-5 flex flex-col gap-3">
              <Link
                className="flex items-center justify-between rounded-md px-2 py-2 hover:bg-[#eee]"
                to="/"
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
                to={`/userSettings/profile/personal`}
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
