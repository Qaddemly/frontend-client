import UserMenu from "./UserMenu";
import Logo from "../common/Logo";

function NavProfile() {
  return (
    <>
      <div className="flex items-center justify-between border-b border-b-gray-100 bg-white px-6 py-3">
        <Logo fontSize="text-3xl" />
        {/* <div>
          <ul className="flex items-center justify-between space-x-8">
            <li className="text-main hover:font-semibold hover:underline">
              Home
            </li>
            <li className="text-main hover:font-semibold hover:underline">
              Find Job
            </li>
            <li className="text-main hover:font-semibold hover:underline">
              Job Tracker
            </li>
            <li className="text-main hover:font-semibold hover:underline">
              Build Resume
            </li>
            <li className="text-main hover:font-semibold hover:underline">
              ATS Scan
            </li>
            <li className="text-main hover:font-semibold hover:underline">
              Post Job
            </li>
          </ul>
        </div> */}
        <UserMenu />
      </div>
    </>
  );
}
export default NavProfile;
