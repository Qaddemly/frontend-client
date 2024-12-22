import { ReactNode } from "react";

type JobDescriptionSectionProps = {
  children: ReactNode;
};

function JobDescriptionSection({ children }: JobDescriptionSectionProps) {
  return <div className="mx-5 py-2 lg:mx-0">{children}</div>;
}

export default JobDescriptionSection;
