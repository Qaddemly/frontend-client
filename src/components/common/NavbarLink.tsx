import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";

import { IconProp } from "@fortawesome/fontawesome-svg-core";

type NavbarLinkProps = {
  to: string;
  content: string;
  icon?: IconProp;
};
function NavbarLink({ to, content, icon }: NavbarLinkProps) {
  return (
    <NavLink
      to={to}
      end
      className={({ isActive }: { isActive: boolean }) =>
        `cursor-pointer border-b-2 pb-1 hover:border-main hover:text-main ${
          isActive ? "border-b-main text-main" : "border-b-white text-gray-600"
        }`
      }
    >
      {icon && <FontAwesomeIcon icon={icon} className="mr-2" />}
      {content}
    </NavLink>
  );
}

export default NavbarLink;
