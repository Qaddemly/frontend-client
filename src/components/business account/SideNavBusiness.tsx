import {
  faBars,
  faBriefcase,
  faGear,
  faUserGroup,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SideNavBusinessLink from "../common/SideNavBusinessLink";
import { useParams } from "react-router-dom";

function SideNavBusiness({
  showSideNav,
  setShowSideNav,
}: {
  showSideNav: boolean;
  setShowSideNav: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { companyId } = useParams();

  return (
    <div
      className={`fixed left-0 top-0 z-50 h-screen justify-end bg-main-dark ${
        showSideNav ? "w-[18rem]" : "w-[5rem]"
      } flex flex-col gap-5 p-5 text-xl font-medium text-white transition-all duration-300 ease-in-out`}
    >
      <SideNavBusinessLink
        to={`/businessDashboard/companyJobs/${companyId}/active`}
        icon={faBriefcase}
        content="Jobs"
        showSideNav={showSideNav}
      />
      <SideNavBusinessLink
        to={`/businessDashboard/companyCandidates/${companyId}`}
        icon={faUserGroup}
        content="Candidates"
        showSideNav={showSideNav}
      />
      <SideNavBusinessLink
        to={[
          `/businessDashboard/companySettings/companyAccount/${companyId}`,
          `/businessDashboard/companySettings/updateCompanyAccount/${companyId}`,
        ]}
        icon={faGear}
        content="Settings"
        showSideNav={showSideNav}
      />
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
    </div>
  );
}

export default SideNavBusiness;
