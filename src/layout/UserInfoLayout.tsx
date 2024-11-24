import { ReactNode } from "react";
import Logo from "../components/common/Logo";

function UserInfoLayout({
  children,
  title,
}: {
  children: ReactNode;
  title: string;
}) {
  return (
    <>
      <nav className="bg-white p-5">
        <Logo />
      </nav>
      <div className="bg-background min-h-screen p-20">
        <div className="bg-white m-auto w-[40rem] rounded-xl p-12 text-center shadow-md">
          <p className="mb-5 text-xl font-medium">{title}</p>
          {children}
        </div>
      </div>
    </>
  );
}

export default UserInfoLayout;
