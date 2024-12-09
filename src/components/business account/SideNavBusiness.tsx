import {
  faBars,
  faChartSimple,
  faGear,
  faPlus,
  faUserGroup,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Link } from "react-router-dom";

function SideNavBusiness() {
  const [showSideNav, setShowSideNav] = useState(false);
  return (
    <div
      className={`bg-main-dark flex ${showSideNav ? "w-[18rem]" : "w-[5rem]"} flex-col gap-5 p-5 text-xl font-medium text-white`}
    >
      <div
        onClick={() => setShowSideNav((s) => !s)}
        className="flex cursor-pointer items-center gap-2 px-2"
      >
        {!showSideNav ? (
          <FontAwesomeIcon icon={faBars} className="text-3xl" />
        ) : (
          <FontAwesomeIcon icon={faXmark} className="text-3xl" />
        )}
        {showSideNav && <p>Collapse</p>}
      </div>
      <Link
        to=""
        className={`flex items-center ${showSideNav ? "" : "justify-center"} gap-2 rounded-md bg-white px-2 py-1 text-[#000]`}
      >
        <FontAwesomeIcon icon={faPlus} className="text-2xl" />
        {showSideNav && <p>Post new job</p>}
      </Link>
      <Link to="" className="flex items-center gap-2 px-2 py-1">
        <FontAwesomeIcon icon={faUserGroup} className="text-2xl" />
        {showSideNav && <p>Candidates</p>}
      </Link>
      <Link to="" className="flex items-center gap-2 px-2 py-1">
        <FontAwesomeIcon icon={faChartSimple} className="text-2xl" />
        {showSideNav && <p>Analytics</p>}
      </Link>
      <Link to="" className="flex items-center gap-2 px-2 py-1">
        <FontAwesomeIcon icon={faGear} className="text-2xl" />
        {showSideNav && <p>Settings</p>}
      </Link>
    </div>
  );
}

export default SideNavBusiness;
