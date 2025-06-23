import { ReactNode, useState } from "react";
import NavbarBusiness from "../components/business account/NavbarBusiness";
import SideNavBusiness from "../components/business account/SideNavBusiness";

function BusinessLayout({ children }: { children: ReactNode }) {
  const [showSideNav, setShowSideNav] = useState(false);
  return (
    <>
      <div className="flex min-h-screen">
        <SideNavBusiness
          showSideNav={showSideNav}
          setShowSideNav={setShowSideNav}
        />
        <div
          className={`min-h-screen w-full transition-all duration-300 ${
            showSideNav ? "ml-[18rem]" : "ml-[5rem]"
          }`}
        >
          <NavbarBusiness />
          {children}
        </div>
      </div>
    </>
  );
}

export default BusinessLayout;
