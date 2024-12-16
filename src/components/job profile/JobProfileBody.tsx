import { ReactNode } from "react";

type JobProfileBodyProps = {
  children: ReactNode;
};
function JobProfileBody({ children }: JobProfileBodyProps) {
  return (
    <div className="mx-auto flex w-full flex-col items-center gap-5 bg-background">
      <div className="mx-auto flex max-w-[1000px] flex-col items-center justify-evenly gap-4 p-2 md:items-start">
        {children}
      </div>
    </div>
  );
}

export default JobProfileBody;
