import { NavLink } from "react-router-dom";

function NavbarLink({ to, content }: { to: string; content: string }) {
  return (
    <NavLink
      to={to}
      end
      className={({ isActive }: { isActive: boolean }) =>
        `cursor-pointer border-b-2 pb-1 text-main hover:border-main ${
          isActive ? "border-b-main" : "border-b-white"
        }`
      }
    >
      {content}
    </NavLink>
  );
}

export default NavbarLink;
