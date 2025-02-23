import { useNavigate, useParams } from "react-router-dom";
import {
  IJobApplication,
  IMeta,
} from "../../../interfaces/BusinessDashboard.interfaces";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers } from "@fortawesome/free-solid-svg-icons";

function ApplicationsTable({
  applications,
  meta,
}: {
  meta: IMeta;
  applications: IJobApplication[];
}) {
  const { companyId, jobId } = useParams();
  const navigate = useNavigate();
  return (
    <>
      {applications.length === 0 ? (
        <p className="mt-10 text-xl italic text-gray-400">No applications</p>
      ) : (
        <>
          <h2 className="text-center text-4xl font-bold">
            Senior UX designer - Full time
          </h2>
          <div className="flex w-fit flex-row rounded-lg bg-white p-5 shadow-md">
            <div className="flex items-center rounded-full bg-light-secondary p-4 text-center text-4xl text-main">
              <FontAwesomeIcon icon={faUsers} />
            </div>
            <div className="ml-4 flex flex-col">
              <p className="text-md text-gray-500">Total Applications</p>
              <p className="text-3xl font-bold">{applications?.length}</p>
              <p>
                <span className="font-medium text-yellow">↑ 16%</span> this
                month
                {/* TODO: remove or evaluate */}
              </p>
            </div>
          </div>
          <div className="rounded-lg bg-white px-8 py-5 shadow-lg">
            <div className="mb-4 flex flex-wrap items-center justify-between">
              <h3 className="text-xl font-semibold">All Applications</h3>
              <div className="flex gap-5">
                <select
                  name="Sort"
                  className="rounded-lg border-none bg-light-secondary p-2 text-sm"
                >
                  <option value="newest">Sort: Newest</option>
                  <option value="oldest">Sort: Oldest</option>
                </select>
                <button
                  onClick={() =>
                    navigate(
                      `/businessDashboard/companyJobs/${companyId}/jobApplications/${jobId}/jobTracker`,
                    )
                  }
                  className="rounded-lg border border-main px-3 py-1 text-sm font-medium text-main hover:bg-main hover:text-white"
                >
                  Track this job
                </button>
              </div>
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
                    <th className="p-3 text-sm font-bold text-gray-500">
                      Email
                    </th>
                    <th className="p-3 text-sm font-bold text-gray-500">
                      Country
                    </th>
                    <th className="p-3 text-sm font-bold text-gray-500">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {applications.map((application) => (
                    <tr
                      key={application.id}
                      // TODO: onClick => view the application
                      // GAD TODO: onHover => Show message to view the application
                      className="cursor-pointer border-t border-gray-100 transition hover:bg-gray-100 hover:bg-opacity-30"
                    >
                      <td className="px-6 py-4 text-sm font-normal">
                        {application.account.first_name}{" "}
                        {application.account.last_name}
                      </td>
                      <td className="px-6 py-4 text-sm font-normal">
                        {application.account.phone.number}
                      </td>
                      <td className="px-6 py-4 text-sm font-normal">
                        {application.account.email}
                      </td>
                      <td className="px-6 py-4 text-sm font-normal">
                        {application.account.address.country}{" "}
                        {application.account.address.city}
                      </td>
                      <td className="px-6 py-4 text-sm font-normal">
                        {/* <button className="mr-2 rounded-lg border border-green-100 px-3 py-1 text-sm font-medium text-green-100 hover:bg-green-200 hover:text-white">
                    Approve
                  </button>
                  <button className="mr-2 rounded-lg border border-danger-300 px-3 py-1 text-sm font-medium text-danger-300 hover:bg-danger-300 hover:text-white">
                    Deny
                  </button> */}
                        <button className="rounded-lg border border-main px-3 py-1 text-sm font-medium text-main hover:bg-main hover:text-white">
                          Show Profile
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
                {meta.totalItems}
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default ApplicationsTable;
