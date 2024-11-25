import { Link } from "react-router-dom";

function Navbar() {
  return (
    <>
      <div className="flex items-center justify-between bg-white px-6 py-3">
        <Link to="/" className="text-[40px] font-bold text-main">
          Qaddemly
        </Link>
        <div>
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
        </div>
        <div className="flex space-x-2">
          <button className="rounded-md border border-main px-6 py-2 text-main hover:bg-main hover:text-white">
            Sign up
          </button>
          <button className="rounded-md bg-main px-6 py-2 text-white hover:border-2 hover:bg-white hover:text-main">
            Log in
          </button>
        </div>
      </div>
    </>
  );
}
export default Navbar;
