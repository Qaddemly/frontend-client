import { ReactNode } from "react";

type UserProfileSectionProps = {
  title: string;
  startDate: string;
  endDate: string;
  children: ReactNode;
};

function UserProfileSection({
  title,
  startDate,
  endDate,
  children,
}: UserProfileSectionProps) {
  return (
    <div className="mb-10">
      <div className="flex justify-between">
        <p className="mb-2 text-lg font-semibold">{title}</p>
        <p className="text-gray-400">
          {startDate} - {endDate}
        </p>
      </div>
      {children}
    </div>
  );
}

export default UserProfileSection;
