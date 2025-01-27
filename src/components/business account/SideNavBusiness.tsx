import {
  faBars,
  faBriefcase,
  faGear,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import SideNavBusinessLink from "../common/SideNavBusinessLink";

function SideNavBusiness() {
  const [showSideNav, setShowSideNav] = useState(false);

  return (
    <div
      className={`flex bg-main-dark ${showSideNav ? "w-[18rem]" : "w-[5rem]"} flex-col gap-5 p-5 text-xl font-medium text-white`}
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

      <SideNavBusinessLink
        to="/businessDashboard/companyJobs"
        icon={faBriefcase}
        content="Jobs"
        showSideNav={showSideNav}
      />
      {/* <SideNavBusinessLink
        to=""
        icon={faUserGroup}
        content="Candidates"
        showSideNav={showSideNav}
      /> */}
      {/* <SideNavBusinessLink
        to=""
        icon={faChartSimple}
        content="Analytics"
        showSideNav={showSideNav}
      /> */}
      <SideNavBusinessLink
        to={[
          "/businessDashboard/companySettings/companyAccount/1",
          "/businessDashboard/companySettings/updateCompanyAccount/1",
        ]}
        icon={faGear}
        content="Settings"
        showSideNav={showSideNav}
      />
    </div>
  );
}

export default SideNavBusiness;
