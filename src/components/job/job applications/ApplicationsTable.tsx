type Applicant = {
  name: string;
  phone: string;
  email: string;
  country: string;
};

type ApplicationsTableProps = {
  applicants: Applicant[];
};

function ApplicationsTable({ applicants }: ApplicationsTableProps) {
  return (
    <div className="rounded-lg bg-white px-8 py-5 shadow-lg">
      <div className="mb-4 flex flex-wrap items-center justify-between">
        <h3 className="text-xl font-semibold">All Applications</h3>
        <select
          name="Sort"
          className="rounded-lg border-none bg-light-secondary p-2 text-sm"
        >
          <option value="newest">Sort: Newest</option>
          <option value="oldest">Sort: Oldest</option>
        </select>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-center">
          <thead>
            <tr className="">
              <th className="p-3 text-sm font-bold text-gray-500">
                Applicant Name
              </th>
              <th className="p-3 text-sm font-bold text-gray-500">
                Phone Number
              </th>
              <th className="p-3 text-sm font-bold text-gray-500">Email</th>
              <th className="p-3 text-sm font-bold text-gray-500">Country</th>
              <th className="p-3 text-sm font-bold text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody>
            {applicants.map((applicant, index) => (
              <tr
                key={index}
                // TODO: onClick => view the application
                // GAD TODO: onHover => Show message to view the application
                className="cursor-pointer border-t border-gray-100 transition hover:bg-gray-100 hover:bg-opacity-30"
              >
                <td className="px-6 py-4 text-sm font-normal">
                  {applicant.name}
                </td>
                <td className="px-6 py-4 text-sm font-normal">
                  {applicant.phone}
                </td>
                <td className="px-6 py-4 text-sm font-normal">
                  {applicant.email}
                </td>
                <td className="px-6 py-4 text-sm font-normal">
                  {applicant.country}
                </td>
                <td className="px-6 py-4 text-sm font-normal">
                  <button className="mr-2 rounded-lg border border-green-100 px-3 py-1 text-sm font-medium text-green-100 hover:bg-green-200 hover:text-white">
                    Approve
                  </button>
                  <button className="mr-2 rounded-lg border border-danger-300 px-3 py-1 text-sm font-medium text-danger-300 hover:bg-danger-300 hover:text-white">
                    Deny
                  </button>
                  <button className="rounded-lg border border-main px-3 py-1 text-sm font-medium text-main hover:bg-main hover:text-white">
                    ATS scan
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-3 flex items-center justify-center space-x-1">
        <button className="rounded-lg border px-2 py-1 text-sm text-gray-700 hover:bg-gray-700 hover:text-white">
          1
        </button>
        <button className="rounded-lg border px-2 py-1 text-sm text-gray-700 hover:bg-gray-700 hover:text-white">
          2
        </button>
        <button className="rounded-lg border px-2 py-1 text-sm text-gray-700 hover:bg-gray-700 hover:text-white">
          3
        </button>
        <span className="px-2 py-1 text-sm text-gray-700">...</span>
        <button className="rounded-lg border px-2 py-1 text-sm text-gray-700 hover:bg-gray-700 hover:text-white">
          20
        </button>
      </div>
    </div>
  );
}

export default ApplicationsTable;
