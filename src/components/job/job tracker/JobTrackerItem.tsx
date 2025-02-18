import {
  faBuilding,
  faEnvelope,
  faLocationDot,
  faPhone,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import GoogleLogo from "../../common/GoogleLogo";
import Button from "../../common/Button";
import JobTrackerStatus from "./JobTrackerStatus";
import { useState } from "react";

function JobTrackerItem({ userType }: { userType: "business" | "user" }) {
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <div className="mt-4 flex items-center gap-5 rounded-md bg-white p-5 shadow-md">
      <div className="flex w-full gap-5">
        <div className="w-fit rounded-md bg-gray-200 p-5">
          {userType === "user" ? (
            <GoogleLogo className="h-12 w-12" />
          ) : (
            <FontAwesomeIcon icon={faUser} className="text-5xl" />
          )}
        </div>

        <div className="flex flex-col gap-1">
          {userType === "user" ? (
            <>
              <div className="text-lg font-semibold">
                Software Developer Intern
              </div>
              <div className="flex items-center gap-2 text-gray-500">
                <FontAwesomeIcon icon={faBuilding} />
                <p>Google Inc.</p>
              </div>
              <div className="flex items-center gap-2 text-gray-500">
                <FontAwesomeIcon icon={faLocationDot} />
                <p>Hybird</p>
              </div>
            </>
          ) : (
            <>
              <div className="text-lg font-semibold">Lionel Messi</div>
              <div className="flex items-center gap-2 text-gray-500">
                <FontAwesomeIcon icon={faEnvelope} />
                <p>messi@goat.com</p>
              </div>
              <div className="flex items-center gap-2 text-gray-500">
                <FontAwesomeIcon icon={faPhone} />
                <p>(225) 555-0118</p>
              </div>
            </>
          )}
        </div>
      </div>

      <JobTrackerStatus userType={userType} setShowConfirm={setShowConfirm} />

      <div>
        {userType === "user" ? (
          <Button className="px-3">Archive</Button>
        ) : (
          showConfirm && (
            <Button onClick={() => setShowConfirm(false)} className="px-3">
              Confirm
            </Button>
          )
        )}
      </div>
    </div>
  );
}

export default JobTrackerItem;
