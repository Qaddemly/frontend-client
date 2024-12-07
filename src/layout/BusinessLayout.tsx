import { ReactNode } from "react";
import NavbarBusiness from "../components/business account/NavbarBusiness";
import SideNavBusiness from "../components/business account/SideNavBusiness";

function BusinessLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex">
      <SideNavBusiness />
      <div className="w-full">
        <NavbarBusiness />
        {children}
      </div>
    </div>
  );
}

export default BusinessLayout;
