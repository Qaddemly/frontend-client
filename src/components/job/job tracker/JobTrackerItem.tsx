import { faBuilding, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import GoogleLogo from "../../common/GoogleLogo";
import Button from "../../common/Button";
import JobTrackerStatus from "./JobTrackerStatus";

function JobTrackerItem() {
  return (
    <div className="mt-4 flex items-center gap-5 rounded-md bg-white p-5 shadow-md">
      <div className="flex w-full gap-5">
        <div className="w-fit rounded-md bg-gray-200 p-5">
          <GoogleLogo className="h-12 w-12" />
        </div>
        <div className="flex flex-col gap-1">
          <div className="text-lg font-semibold">Software Developer Intern</div>
          <div className="flex items-center gap-2 text-gray-500">
            <FontAwesomeIcon icon={faBuilding} />
            <p>Google Inc.</p>
          </div>
          <div className="flex items-center gap-2 text-gray-500">
            <FontAwesomeIcon icon={faLocationDot} />
            <p>Hybird</p>
          </div>
        </div>
      </div>

      <JobTrackerStatus />

      <div>
        <Button className="px-3">Archive</Button>
      </div>
    </div>
  );
}

export default JobTrackerItem;
