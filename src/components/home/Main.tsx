import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBriefcase } from "@fortawesome/free-solid-svg-icons";
import { faBuilding } from "@fortawesome/free-regular-svg-icons";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { faBookmark } from "@fortawesome/free-regular-svg-icons";
import { faAnglesRight } from "@fortawesome/free-solid-svg-icons";

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
          <ul className="flex items-center justify-center space-x-10">
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

      <div className="px-6">
        <div className="mt-20 flex items-center justify-between">
          <p className="text-2xl font-bold">Recommended Jobs</p>
          <button className="rounded-md border-2 border-gray-100 p-2 text-main hover:bg-main hover:text-white">
            View All <FontAwesomeIcon icon={faAnglesRight} />
          </button>
        </div>

        <div className="p-4">
          <ul className="mt-5 flex items-center justify-between space-x-10 px-3">
            <li className="border-2 border-gray-100 p-2">
              <span className="block">Techical Support Specialist</span>
              <span className="bg-light-green text-green-200">Part-Time :</span>
              <span className="block text-gray-600">
                Salary: $20,000 - $25,000
              </span>

              <FontAwesomeIcon icon={faBookmark} className="text-main" />
            </li>
            <li className="border-2 border-gray-100 p-2">
              <span className="block">Techical Support Specialist</span>
              <span className="bg-light-green text-green-200">Part-Time :</span>
              <span className="block text-gray-600">
                Salary: $20,000 - $25,000
              </span>

              <FontAwesomeIcon icon={faBookmark} className="text-main" />
            </li>
            <li className="border-2 border-gray-100 p-2">
              <span className="block">Techical Support Specialist</span>
              <span className="bg-light-green text-green-200">Part-Time :</span>
              <span className="block text-gray-600">
                Salary: $20,000 - $25,000
              </span>

              <FontAwesomeIcon icon={faBookmark} className="text-main" />
            </li>
            <li className="border-2 border-gray-100 p-2">
              <span className="block">Techical Support Specialist</span>
              <span className="bg-light-green text-green-200">Part-Time :</span>
              <span className="block text-gray-600">
                Salary: $20,000 - $25,000
              </span>

              <FontAwesomeIcon icon={faBookmark} className="text-main" />
            </li>
            <li className="border-2 border-gray-100 p-2">
              <span className="block">Techical Support Specialist</span>
              <span className="bg-light-green text-green-200">Part-Time :</span>
              <span className="block text-gray-600">
                Salary: $20,000 - $25,000
              </span>

              <FontAwesomeIcon icon={faBookmark} className="text-main" />
            </li>
            <li className="border-2 border-gray-100 p-2">
              <span className="block">Techical Support Specialist</span>
              <span className="bg-light-green text-green-200">Part-Time :</span>
              <span className="block text-gray-600">
                Salary: $20,000 - $25,000
              </span>

              <FontAwesomeIcon icon={faBookmark} className="text-main" />
            </li>
            <li className="border-2 border-gray-100 p-2">
              <span className="block">Techical Support Specialist</span>
              <span className="bg-light-green text-green-200">Part-Time :</span>
              <span className="block text-gray-600">
                Salary: $20,000 - $25,000
              </span>

              <FontAwesomeIcon icon={faBookmark} className="text-main" />
            </li>
            <li className="border-2 border-gray-100 p-2">
              <span className="block">Techical Support Specialist</span>
              <span className="bg-light-green text-green-200">Part-Time :</span>
              <span className="block text-gray-600">
                Salary: $20,000 - $25,000
              </span>

              <FontAwesomeIcon icon={faBookmark} className="text-main" />
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Main;
