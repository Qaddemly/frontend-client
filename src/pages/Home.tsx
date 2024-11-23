import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBriefcase } from "@fortawesome/free-solid-svg-icons";
import { faBuilding } from "@fortawesome/free-regular-svg-icons";
import { faUsers } from "@fortawesome/free-solid-svg-icons";

function Home() {
  return (
    <>
      <div className="bg-background">
        <Navbar />
        <Main />
        <Footer />
      </div>
    </>
  );
}
function Navbar() {
  return (
    <>
      <div className="flex items-center justify-between bg-white px-6 py-3">
        <Link to="/" className="text-[40px] font-bold text-main">
          Qaddemly
        </Link>
        <div>
          <ul className="flex items-center justify-between gap-4">
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
        <div>
          <button className="gap-2 rounded-md border border-main px-6 py-2 text-main hover:bg-main hover:text-white">
            Sign up
          </button>
          <button className="gap-2 rounded-md bg-main px-6 py-2 text-white hover:bg-white hover:text-main">
            Log in
          </button>
        </div>
      </div>
    </>
  );
}

function Main() {
  return (
    <>
      <div className="mx-6 my-20 w-2/5">
        <p className="text-3xl font-semibold">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid
          provident temporibus eius odit earum, exercitationem ex suscipit
          laborum culpa ipsa id ad? Deleniti dignissimos accusamus quaerat nihil
          nesciunt fugiat libero.
        </p>
        <p className="mt-6 text-gray-600">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut in
          architecto molestiae autem enim unde tempore explicabo incidunt atque
          voluptatum. Nisi, architecto quibusdam explicabo cum officia dolor
          magnam. Eos, architecto!
        </p>

        <div className="mt-20 flex items-center justify-between px-6">
          <ul className="flex items-center justify-center">
            <li className="rounded-md bg-white px-5 py-3">
              <FontAwesomeIcon
                icon={faBriefcase}
                className="mr-3 text-3xl text-main"
              />
              <span className="mr-3 font-bold"> 4,593,456</span>
              <span className="block text-gray-600">Live Job</span>
            </li>

            <li className="rounded-md bg-white px-5 py-3">
              <FontAwesomeIcon
                icon={faBuilding}
                className="mr-3 text-3xl text-main"
              />
              <span className="mr-3 font-bold"> 4,593,456</span>
              <span className="block text-gray-600">Companies</span>
            </li>

            <li className="rounded-md bg-white px-5 py-3">
              <FontAwesomeIcon
                icon={faUsers}
                className="mr-3 text-3xl text-main"
              />
              <span className="mr-3 font-bold"> 4,593,456</span>
              <span className="block text-gray-600">Candidates</span>
            </li>

            <li className="rounded-md bg-white px-5 py-3">
              <FontAwesomeIcon
                icon={faBriefcase}
                className="mr-3 text-3xl text-main"
              />
              <span className="mr-3 font-bold"> 4,593,456</span>
              <span className="block text-gray-600">New Jobs</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-20 flex items-center justify-center bg-secondary">
        <p className="mt-20 text-3xl font-bold">How Qaddemly work ?</p>
      </div>
    </>
  );
}

function Footer() {
  return <div>footer</div>;
}

export default Home;
