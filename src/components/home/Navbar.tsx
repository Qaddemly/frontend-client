import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../../store/store";
import UserMenu from "../profile/UserMenu";

function Navbar() {
  const { user } = useSelector((state: RootState) => state.user);
  return (
    <>
      <nav className="flex items-center justify-between bg-white px-6 py-3">
        <Link to="/" className="px-5 text-[40px] font-bold text-main">
          Qaddemly
        </Link>
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
          <UserMenu />
        )}
      </nav>
    </>
  );
}
export default Navbar;
