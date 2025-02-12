import { ReactNode } from "react";

type ProfileCardProps = {
  startDate: string;
  endDate: string;
  title: string;
  children: ReactNode;
  handleDelete: (e: React.MouseEvent<HTMLButtonElement>) => void;
  handleEdit: () => void;
};

function ProfileCard({
  startDate,
  endDate,
  title,
  children,
  handleDelete,
  handleEdit,
}: ProfileCardProps) {
  return (
    <div className="max-w-[20rem] rounded-2xl border border-gray-200 bg-white p-8 shadow-md hover:shadow-lg">
      <h2 className="text-gray-900 text-xl font-semibold">{title}</h2>
      {children}
      <div className="mt-3 flex items-center gap-5 text-sm text-gray-700">
        <div>
          <p>
            <span className="font-semibold">Start Date: </span>
            {new Date(startDate).toLocaleDateString()}
          </p>
          <p>
            <span className="font-semibold">End Date: </span>
            {new Date(endDate).toLocaleDateString()}
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <button
            onClick={handleEdit}
            className="rounded-md bg-main px-4 py-1 font-medium text-white hover:bg-light-main"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="rounded-md bg-danger-300 px-2 py-1 font-medium text-white hover:bg-danger-200"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfileCard;
