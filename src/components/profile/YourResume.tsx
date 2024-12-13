import { faCirclePlus, faFileLines } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../common/Button";

function YourResume() {
  return (
    <div className="my-20 mb-10 px-10">
      <span className="text-xl font-semibold">Your CV/Resume</span>
      <ul className="mt-5 flex items-center justify-between space-x-7">
        <li className="space-x-2 rounded-md bg-gray-200 px-5 py-3">
          <FontAwesomeIcon icon={faFileLines} className="text-main" />
          <span>Professional Resume</span>
          <button className="px-2 text-xl text-gray-300">...</button>
          <span className="block px-3 text-gray-300">3.5MB</span>
        </li>
        <li className="space-x-2 rounded-md bg-gray-200 px-5 py-3">
          <FontAwesomeIcon icon={faFileLines} className="text-main" />
          <span>Professional Resume</span>
          <button className="px-2 text-xl text-gray-300">...</button>
          <span className="block px-3 text-gray-300">3.5MB</span>
        </li>
        <li className="space-x-2 rounded-md bg-gray-200 px-5 py-3">
          <FontAwesomeIcon icon={faFileLines} className="text-main" />
          <span>Professional Resume</span>
          <button className="px-2 text-xl text-gray-300">...</button>
          <span className="block px-3 text-gray-300">3.5MB</span>
        </li>
        <li className="space-x-2 rounded-md bg-gray-200 px-5 py-3">
          <FontAwesomeIcon icon={faFileLines} className="text-main" />
          <span>Professional Resume</span>
          <button className="px-2 text-xl text-gray-300">...</button>
          <span className="block px-3 text-gray-300">3.5MB</span>
        </li>
      </ul>
      <Button className="mt-5 rounded-md border-2 border-dashed border-gray-200 px-5 py-3">
        <FontAwesomeIcon icon={faCirclePlus} className="text-main" />

        <span className="px-3">Add CV/Resume</span>
        <span className="block text-sm text-gray-300">
          Browse file or drop here; only pdf
        </span>
      </Button>
    </div>
  );
}
export default YourResume;
