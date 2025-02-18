import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink, useLocation } from "react-router-dom";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

type NavbarLinkProps = {
  to: string | string[];
  content: string;
  icon?: IconProp;
};
function NavbarLink({ to, content, icon }: NavbarLinkProps) {
  const location = useLocation();
  const isActive = Array.isArray(to)
    ? to.includes(location.pathname)
    : location.pathname === to;

  return (
    <NavLink
      to={Array.isArray(to) ? to[0] : to}
      end
      className={`cursor-pointer border-b-2 pb-1 hover:border-main hover:text-main ${
        isActive ? "border-b-main text-main" : "border-b-white text-gray-600"
      }`}
    >
      {icon && <FontAwesomeIcon icon={icon} className="mr-2" />}
      {content}
    </NavLink>
  );
}

export default NavbarLink;
