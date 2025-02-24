// CompanyJobs should take jobs from Backend and pass each one to EditJobCard
import { useState } from "react";
import { NavLink, Outlet, useNavigate, useParams } from "react-router-dom";
import EditJobCard from "../../job/EditJobCard";
import { useGetAllJobsQuery } from "../../../services/jobApi";
import Loader from "../../common/Loader";
import Button from "../../common/Button";
import {
  useMakeJobArchivedMutation,
  useMakeJobClosedMutation,
  useMakeJobOpenedMutation,
} from "../../../services/businessDashboardApi";
import toast from "react-hot-toast";
import { handleApiError } from "../../../utils/helpers";

function CompanyJobs() {
  const [makeJobArchived, { isLoading: loadingArchive }] =
    useMakeJobArchivedMutation();
  const [makeJobClosed, { isLoading: loadingClosed }] =
    useMakeJobClosedMutation();
  const [makeJobOpened, { isLoading: loadingOpened }] =
    useMakeJobOpenedMutation();

  const { companyId } = useParams();
  const { data, isLoading, refetch } = useGetAllJobsQuery({});

  const jobs = data?.jobs.data;

  const [selectedValue, setSelectedValue] = useState("all");

  const isJobApplicationsRoute = location.pathname.includes(
    `/businessDashboard/companyJobs/${companyId}/jobApplications`,
  );
  const isJobRoute = location.pathname.endsWith("/active");

  const isPostJobRoute = location.pathname.endsWith(`/postjob`);

  const filteredJobCards = jobs?.filter((job) => {
    if (selectedValue === "available") return job.status === "Opened";
    if (selectedValue === "unavailable") return job.status === "Closed";
    return true; // Default: show all
  });

  const navigate = useNavigate();

  async function handleJobStatus(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    status: "Closed" | "Opened",
    id: number,
  ) {
    e.stopPropagation();
    try {
      let res;
      if (status === "Opened") {
        res = await makeJobClosed({ id: id.toString() || "" }).unwrap();
      } else {
        res = await makeJobOpened({ id: id.toString() || "" }).unwrap();
      }
      toast.success(res?.message || "");
      refetch();
    } catch (err) {
      handleApiError(err);
    }
  }
  async function handleArchiveJob(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) {
    e.stopPropagation();
    try {
      const res = await makeJobArchived({ id: companyId || "" }).unwrap();
      toast.success(res?.message || "");
      refetch();
    } catch (err) {
      handleApiError(err);
    }
  }

  if (isLoading || loadingArchive || loadingClosed || loadingOpened)
    return <Loader />;

  return (
    <>
      <div className="flex items-center bg-[#eee] p-2">
        <div className="border-r border-r-gray-100 px-10 py-3">
          <p className="text-xl font-semibold">Employer Jobs</p>
        </div>
        <div className="flex gap-5 pl-5 text-lg font-medium">
          <NavLink
            to={`/businessDashboard/companyJobs/${companyId}/active`}
            className={`px-2 py-1 ${isJobApplicationsRoute || isJobRoute || isPostJobRoute ? "rounded-md bg-main text-white" : ""}`}
          >
            Jobs
          </NavLink>
        </div>
      </div>

      {isJobApplicationsRoute || isPostJobRoute ? (
        <Outlet />
      ) : (
        <div className="my-10 flex max-w-screen-xl flex-col-reverse justify-center gap-20 px-2 md:mx-auto md:flex-col md:px-7">
          {jobs?.length !== 0 ? (
            <div className="flex flex-col gap-6 px-7 md:gap-4">
              <div className="flex flex-col justify-between gap-5 md:flex-row">
                <h2 className="text-center text-3xl font-semibold md:text-left">
                  All Jobs
                </h2>
                <div className="flex flex-col gap-2 md:flex-row">
                  {/* Show Available/Unavailable */}
                  <select
                    name="Show All"
                    value={selectedValue}
                    className={`rounded-md border-2 p-2 shadow-md outline-none ${selectedValue === "available" ? "border-green-100 text-green-100" : selectedValue === "unavailable" ? "border-danger-300 text-danger-300" : "border-main text-main"} cursor-pointer`}
                    onChange={(e) => setSelectedValue(e.target.value)}
                  >
                    <option value="all" className="text-main">
                      Show All
                    </option>
                    <option value="available" className="text-green-100">
                      Show Available
                    </option>
                    <option value="unavailable" className="text-danger-300">
                      Show Unavailable
                    </option>
                  </select>
                  {/* Sort by Newest, Oldest */}
                  <select
                    name="Sort By"
                    id=""
                    value=""
                    className="cursor-pointer rounded-md border-2 border-main p-2 text-main shadow-md outline-none"
                    onChange={() => {}}
                  >
                    <option value="newest" className="text-main">
                      Sort by : Newest
                    </option>
                    <option value="oldest" className="text-main">
                      Sort by : Oldest
                    </option>
                  </select>
                </div>
              </div>
              {/* Active/Archived */}
              <div className="flex justify-center gap-5 border-b-2 border-b-gray-400 md:justify-start md:gap-10">
                <p className="text-center font-medium md:text-left">
                  {jobs?.length} Total Jobs
                </p>
                <NavLink
                  end
                  to={`/businessDashboard/companyJobs/${companyId}/active`}
                  className={({ isActive }: { isActive: boolean }) =>
                    `cursor-pointer border-b-4 pb-2 text-center hover:text-main md:text-left ${
                      isActive
                        ? "border-b-main text-main"
                        : "border-b-white text-gray-600"
                    }`
                  }
                >
                  Active ({jobs?.length})
                </NavLink>

                <NavLink
                  end
                  to={`/businessDashboard/companyJobs/${companyId}/archived`}
                  className={({ isActive }: { isActive: boolean }) =>
                    `cursor-pointer border-b-4 pb-2 text-center hover:text-main md:text-left ${
                      isActive
                        ? "border-b-main text-main"
                        : "border-b-white text-gray-600"
                    }`
                  }
                >
                  Archived (0)
                </NavLink>
              </div>

              {filteredJobCards?.length !== 0 ? (
                <>
                  {/* mobile view : cards */}
                  <div className="my-6 flex flex-col-reverse justify-center gap-8 px-7 md:hidden">
                    <div
                      className={`grid grid-cols-1 gap-8 ${filteredJobCards?.length === 1 ? "sm:grid-cols-1" : "sm:grid-cols-2"}`}
                    >
                      {filteredJobCards?.map((job) => (
                        <EditJobCard
                          key={job.id}
                          job={job}
                          handleJobStatus={handleJobStatus}
                          handleArchiveJob={handleArchiveJob}
                        />
                      ))}
                    </div>
                  </div>
                  {/* Big screen view : table */}
                  <div className="hidden overflow-x-auto md:block">
                    <table className="w-full text-center">
                      <thead>
                        <tr className="">
                          <th className="p-3 text-sm font-bold text-gray-500">
                            Job title
                          </th>
                          <th className="p-3 text-sm font-bold text-gray-500">
                            Job type
                          </th>
                          <th className="p-3 text-sm font-bold text-gray-500">
                            No. of Applications
                          </th>
                          <th className="p-3 text-sm font-bold text-gray-500">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredJobCards?.map((job) => (
                          <tr
                            key={job.id}
                            // GAD TODO: onClick => view full job details
                            // GAD TODO: onHover => Show message to view details
                            className="cursor-pointer border-t border-gray-100 hover:bg-gray-100 hover:bg-opacity-30"
                          >
                            <td className="px-6 py-4 text-sm font-normal">
                              {job.title}
                            </td>

                            <td className="px-6 py-4 text-sm font-normal">
                              {job.location_type}
                            </td>
                            <td className="px-6 py-4 text-sm font-normal">
                              {/* {job.noOfApps} */}2
                            </td>
                            <td className="flex justify-center px-6 py-4 text-sm font-normal">
                              <div className="flex flex-row gap-2">
                                <Button
                                  className="border border-main bg-white px-3 py-1 text-base text-main hover:bg-main hover:text-white"
                                  onClick={() =>
                                    navigate(
                                      `/businessDashboard/companyJobs/${companyId}/jobApplications/${job.id}`,
                                    )
                                  }
                                >
                                  Show Applications
                                </Button>
                                <Button
                                  onClick={(e) => {
                                    if (job.status === "Closed")
                                      handleJobStatus(e, "Closed", job.id);
                                    else handleJobStatus(e, "Opened", job.id);
                                  }}
                                  className={`border px-3 py-1 text-base hover:text-white ${
                                    job.status === "Opened"
                                      ? "border-danger-300 bg-white text-danger-300 hover:bg-danger-300"
                                      : "border-green-100 bg-white text-green-100 hover:bg-green-100"
                                  }`}
                                >
                                  {job.status === "Opened"
                                    ? "Set Unavailable"
                                    : "Set Available"}
                                </Button>
                                <Button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    navigate(
                                      `/businessDashboard/updatejob/${job.id}`,
                                    );
                                  }}
                                  className="border border-main bg-white px-3 py-1 text-base text-main hover:bg-main hover:text-white"
                                >
                                  Edit
                                </Button>
                                <Button
                                  onClick={(e) => handleArchiveJob(e)}
                                  className="border border-main bg-main px-3 py-1 text-base text-white hover:bg-white hover:text-main"
                                >
                                  Archive
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  {/* pagination
                TODO : make it a separate component */}
                  <div className="flex items-center justify-center space-x-1 md:justify-end">
                    <Button className="rounded-lg bg-background px-2 py-1 text-sm text-gray-700 hover:bg-main hover:text-white">
                      1
                    </Button>
                    <Button className="rounded-lg bg-background px-2 py-1 text-sm text-gray-700 hover:bg-main hover:text-white">
                      2
                    </Button>
                    <Button className="rounded-lg bg-background px-2 py-1 text-sm text-gray-700 hover:bg-main hover:text-white">
                      3
                    </Button>
                    <span className="px-2 py-1 text-sm text-gray-700">...</span>
                    <Button className="rounded-lg bg-background px-2 py-1 text-sm text-gray-700 hover:bg-main hover:text-white">
                      {/* {meta.totalItems} */}
                      40
                    </Button>
                  </div>
                </>
              ) : (
                <h3 className="text-center text-2xl font-bold text-gray-600">
                  {selectedValue === "all"
                    ? "There is no active jobs to show."
                    : selectedValue === "available"
                      ? "There are no available jobs to show."
                      : "There are no unavailable jobs to show."}
                </h3>
              )}
            </div>
          ) : (
            <div className="text-center text-2xl font-bold text-gray-600">
              Start posting your jobs
            </div>
          )}
          <div
            className={`mx-5 flex justify-center md:justify-end ${filteredJobCards ? "" : "md:justify-center"}`}
          >
            <Button
              onClick={() =>
                navigate(
                  `/businessDashboard/companyJobs/${companyId}/active/postjob`,
                )
              }
              className={`border-2 border-main bg-main px-6 py-1 text-base text-white hover:bg-white hover:text-main`}
            >
              Post New Job
            </Button>
          </div>
        </div>
      )}
    </>
  );
}

{
  /* <div
  className={`rounded-l-xl border-l-8 ${job.status === "Opened" ? "border-l-green-100" : "border-l-danger-300"}`}
></div>; */
}
export default CompanyJobs;
