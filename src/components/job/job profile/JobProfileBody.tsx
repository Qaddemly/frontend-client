import { ReactNode } from "react";

type JobProfileBodyProps = {
  children: ReactNode;
};
function JobProfileBody({ children }: JobProfileBodyProps) {
  return (
    <div className="flex flex-col items-start gap-5 bg-background">
      <div className="w-full gap-4 px-[25rem] py-5">{children}</div>
    </div>
  );
}

export default JobProfileBody;
