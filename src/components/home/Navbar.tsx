import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../../store/store";
import UserMenu from "../profile/UserMenu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import Logo from "../common/Logo";
import { useGetUserBusinessesQuery } from "../../services/businessAccountApi";
import { useEffect } from "react";
import { setUserBusinessesAccounts } from "../business account/BusinessAccountSlice";

function Navbar() {
  const { user } = useSelector((state: RootState) => state.user);
  const { data, isError } = useGetUserBusinessesQuery(undefined, {
    skip: Object.entries(user).length === 0,
  });
  const dispatch = useDispatch();

  useEffect(() => {
    if (isError && data) {
      console.log(isError);

      dispatch(setUserBusinessesAccounts(data.businesses));
    }
  }, [data, dispatch, isError]);

  return (
    <>
      <nav className="flex items-center justify-between border-b border-b-gray-100 bg-white px-6 py-3">
        <Logo fontSize="text-4xl" />
        <div>
          <ul className="flex items-center justify-between space-x-8">
            <li className="cursor-pointer border-b-2 border-white text-main hover:border-main">
              Home
            </li>
            <li className="cursor-pointer border-b-2 border-white text-main hover:border-main">
              Find Job
            </li>
            <li className="cursor-pointer border-b-2 border-white text-main hover:border-main">
              Job Tracker
            </li>
            <li className="cursor-pointer border-b-2 border-white text-main hover:border-main">
              Build Resume
            </li>
            <li className="cursor-pointer border-b-2 border-white text-main hover:border-main">
              ATS Scan
            </li>
            <li className="cursor-pointer border-b-2 border-white text-main hover:border-main">
              Post Job
            </li>
          </ul>
        </div>
        {!user.active ? (
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
          <UserMenu type="NormalAccount">
            <div className="mt-2 flex flex-col gap-3">
              <div className="px-3 pb-2">
                <p className="font-medium">{user.email}</p>
              </div>
              <Link
                to="/profile/personal"
                className="rounded-md hover:bg-[#eee]"
              >
                <div className="flex items-center gap-5 px-3 py-2">
                  <FontAwesomeIcon icon={faUser} className="text-lg" />
                  <span className="text-lg font-medium">Profile</span>
                </div>
              </Link>
            </div>
          </UserMenu>
        )}
      </nav>
    </>
  );
}
export default Navbar;
