import { ReactNode } from "react";

type JobProfileBodyProps = {
  children: ReactNode;
};
function JobProfileBody({ children }: JobProfileBodyProps) {
  return (
    <div className="flex flex-col items-start gap-5 bg-background">
      <div className="w-full gap-4 px-5 py-5 sm:px-20 md:px-52 lg:px-[15rem] xl:px-[25rem]">
        {children}
      </div>
    </div>
  );
}

export default JobProfileBody;
