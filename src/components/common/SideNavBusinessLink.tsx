import { NavLink, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FontAwesomeIconProps } from "@fortawesome/react-fontawesome";
import { faChevronRight, faUserGroup } from "@fortawesome/free-solid-svg-icons";

type SideNavBusinessLinkProps = {
  to: string | string[];
  icon: FontAwesomeIconProps["icon"];
  content: string;
  showSideNav: boolean;
};

function SideNavBusinessLink({
  to,
  icon,
  content,
  showSideNav,
}: SideNavBusinessLinkProps) {
  const location = useLocation();

  const isActive = (path: string | string[]) => {
    if (Array.isArray(path)) {
      return path.some((p) => location.pathname.startsWith(p));
    }
    return location.pathname.startsWith(path);
  };

  return (
    <NavLink
      to={Array.isArray(to) ? to[0] : to}
      end
      className={() =>
        `flex items-center justify-between rounded-md p-2 ${
          isActive(to) ? "bg-white text-main-dark" : "bg-none"
        }`
      }
    >
      <div className="flex items-center gap-3">
        <FontAwesomeIcon
          icon={icon}
          className={`${icon === faUserGroup ? "" : "text-2xl"}`}
        />
        {showSideNav && <p>{content}</p>}
      </div>
      {showSideNav && <FontAwesomeIcon icon={faChevronRight} />}
    </NavLink>
  );
}

export default SideNavBusinessLink;
