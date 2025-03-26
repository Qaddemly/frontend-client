import { useNavigate, useParams } from "react-router-dom";
import Button from "../../common/Button";
import {
  useLazyGetAllArchivedJobsOfBusinessQuery,
  useMakeJobClosedMutation,
  useMakeJobOpenedMutation,
} from "../../../services/businessDashboardApi";
import { useEffect, useState } from "react";
import Pagination from "../../common/Pagination";
import EditJobCard from "../../job/EditJobCard";
import toast from "react-hot-toast";
import { handleApiError } from "../../../utils/helpers";
import Loader from "../../common/Loader";

function ArchivedCompanyJobs() {
  const [makeJobClosed] = useMakeJobClosedMutation();
  const [makeJobOpened] = useMakeJobOpenedMutation();
  const { companyId } = useParams();
  const navigate = useNavigate();

  const [fetchJobs, { data, isLoading }] =
    useLazyGetAllArchivedJobsOfBusinessQuery();
  const jobs = data?.jobs.data;
  const meta = data?.jobs.meta;

  const [currentPage, setCurrentPage] = useState(meta?.currentPage);
  async function handleJobStatus(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    status: "Closed" | "Opened",
    id: number,
  ) {
    e.stopPropagation();
    try {
      let res;
      if (status === "Opened") {
        res = makeJobClosed({ id: id.toString() || "" }).unwrap();
        toast.promise(res, {
          loading: "Closing Job",
          success: "Job closed successfully",
          error: "Could not close job",
        });
        await res;
      } else {
        res = makeJobOpened({ id: id.toString() || "" }).unwrap();
        toast.promise(res, {
          loading: "Opening Job",
          success: "Job opened successfully",
          error: "Could not open job",
        });
        await res;
      }
      fetchJobs({ id: companyId || "", page: 1, limit: 9 });
    } catch (err) {
      handleApiError(err);
    }
  }

  useEffect(() => {
    fetchJobs({ id: companyId || "", page: 1, limit: 9 });
  }, [fetchJobs]);

  return (
    <>
      {/* mobile view : cards */}
      <div className="my-6 flex flex-col-reverse justify-center gap-8 px-7 md:hidden">
        <div
          className={`grid grid-cols-1 gap-8 ${jobs?.length === 1 ? "sm:grid-cols-1" : "sm:grid-cols-2"}`}
        >
          {jobs?.map((job) => (
            <EditJobCard
              key={job.id}
              job={job}
              handleJobStatus={handleJobStatus}
            />
          ))}
        </div>
      </div>
      {/* Big screen view : table */}
      <div className="hidden overflow-x-auto md:block">
        <table className="w-full text-center">
          <thead>
            <tr className="">
              <th className="p-3 text-sm font-bold text-gray-500">Job title</th>
              <th className="p-3 text-sm font-bold text-gray-500">Job type</th>
              <th className="p-3 text-sm font-bold text-gray-500">
                No. of Applications
              </th>
              <th className="p-3 text-sm font-bold text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody>
            {jobs?.map((job) => (
              <tr
                key={job.id}
                onClick={() => navigate(`/findJob/jobProfile/${job.id}`)}
                className="cursor-pointer border-t border-gray-100 hover:bg-gray-100 hover:bg-opacity-30"
              >
                <td className="px-6 py-4 text-sm font-normal">{job.title}</td>

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
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(
                          `/businessDashboard/companyJobs/${companyId}/active/jobApplications/${job.id}`,
                        );
                      }}
                    >
                      Show Applications
                    </Button>

                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/businessDashboard/updatejob/${job.id}`);
                      }}
                      className="border border-main bg-white px-3 py-1 text-base text-main hover:bg-main hover:text-white"
                    >
                      Edit
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {isLoading && <Loader forSection={true} />}
      </div>

      <Pagination
        currentPage={currentPage || 1}
        totalPages={meta?.totalPages || 1}
        onPageChange={(page) => {
          fetchJobs({
            page,
            limit: 9,
            id: companyId || "",
          });
          setCurrentPage(page);
        }}
      />
    </>
  );
}

export default ArchivedCompanyJobs;
