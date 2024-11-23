import { ReactNode } from "react";

function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="bg-background h-[100vh] overflow-y-auto">
      <div className="bg-white m-auto my-20 w-[485px] rounded-xl p-12 text-center">
        {children}
      </div>
    </div>
  );
}

export default AuthLayout;
