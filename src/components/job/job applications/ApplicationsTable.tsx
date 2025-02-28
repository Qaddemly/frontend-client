import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { IJob } from "../../../interfaces/Job.interfaces";
import { useLazyGetJobApplicationsQuery } from "../../../services/businessDashboardApi";
import Loader from "../../common/Loader";
import { useEffect, useState } from "react";
import Pagination from "../../common/Pagination";

function ApplicationsTable() {
  const { companyId, jobId } = useParams();

  const navigate = useNavigate();

  const [fetchApplications, { data, isLoading }] =
    useLazyGetJobApplicationsQuery();

  const jobApplications = data?.jobApplications.data;
  const meta = data?.jobApplications.meta;
  const [currentPage, setCurrentPage] = useState(meta?.currentPage);
  const [sort, setSort] = useState("");

  const currentJob: IJob | undefined = jobApplications?.find(
    (application) => application?.job?.id.toString() === jobId,
  )?.job;

  useEffect(() => {
    if (sort === "oldest")
      fetchApplications({ id: jobId || "", page: 1, limit: 5, sortBy: "ASC" });
    else
      fetchApplications({ id: jobId || "", page: 1, limit: 5, sortBy: "DESC" });
  }, [fetchApplications, sort]);

  if (isLoading) return <Loader forSection={true} />;
  return (
    <>
      {jobApplications?.length === 0 ? (
        <p className="mt-10 text-xl italic text-gray-400">No applications</p>
      ) : (
        <>
          <h2 className="text-center text-4xl font-bold">
            {currentJob && currentJob.title}
          </h2>
          <div className="flex w-fit flex-row rounded-lg bg-white p-5 shadow-md">
            <div className="flex items-center rounded-full bg-light-secondary p-4 text-center text-4xl text-main">
              <FontAwesomeIcon icon={faUsers} />
            </div>
            <div className="ml-4 flex flex-col">
              <p className="text-md text-gray-500">Total Applications</p>
              <p className="text-3xl font-bold">{jobApplications?.length}</p>
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
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  name="Sort"
                  className="rounded-lg border-none bg-light-secondary p-2 text-sm"
                >
                  <option value="newest">Sort: Newest</option>
                  <option value="oldest">Sort: Oldest</option>
                </select>
                <button
                  onClick={() =>
                    navigate(
                      `/businessDashboard/companyJobs/${companyId}/active/jobApplications/${jobId}/jobTracker`,
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
                  {jobApplications?.map((application) => (
                    <tr
                      key={application.id}
                      className="cursor-pointer border-t border-gray-100 transition hover:bg-gray-100 hover:bg-opacity-30"
                    >
                      <td className="px-6 py-4 text-sm font-normal">
                        {application.account.first_name}{" "}
                        {application.account.last_name}
                      </td>
                      <td className="px-6 py-4 text-sm font-normal">
                        +{application.account.phone.country_code}{" "}
                        {application.account.phone.number}
                      </td>
                      <td className="px-6 py-4 text-sm font-normal">
                        {application.account.email}
                      </td>
                      <td className="px-6 py-4 text-sm font-normal">
                        {application.account.address.country},{" "}
                        {application.account.address.city}
                      </td>
                      <td className="px-6 py-4 text-sm font-normal">
                        <button className="rounded-lg border border-main px-3 py-1 text-sm font-medium text-main hover:bg-main hover:text-white">
                          Show Profile
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Pagination
              currentPage={currentPage || 1}
              totalPages={meta?.totalPages || 1}
              onPageChange={(page) => {
                fetchApplications({
                  id: jobId || "",
                  page,
                  limit: 9,
                });
                setCurrentPage(page);
              }}
            />
          </div>
        </>
      )}
    </>
  );
}

export default ApplicationsTable;
