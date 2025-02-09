import { useGetAllSavedJobsQuery } from "../../services/jobApi";
import Loader from "../common/Loader";
import SavedJobsItems from "../job/SavedJobsItems";

function SavedJob() {
  const { isLoading, data } = useGetAllSavedJobsQuery({});
  const savedJob = data?.savedJobs.data;

  if (isLoading) return <Loader />;

  if (savedJob?.length === 0)
    return <p className="m-20 text-2xl italic text-gray-400">No saved jobs</p>;
  return (
    <>
      <div className="m-10">
        <h2 className="mb-5 text-2xl font-semibold text-gray-800 md:text-3xl">
          Your Saved Jobs
        </h2>
        <p className="text-gray-300">Git access to millions of jobs</p>
        <p className="mt-5 font-medium">All Jobs</p>
        <div className="relative flex gap-3">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center ps-3">
            <svg
              className="h-5 w-5"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              ></path>
            </svg>
          </div>
          <input
            type="text"
            id="table-search"
            className="text-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 block w-72 rounded-lg border border-gray-300 p-2 ps-10 text-sm"
            placeholder="Search for saved job"
          />
        </div>
        <div className="my-10 flex flex-col items-center justify-center">
          <div className="overflow-x-auto rounded-lg border-2 border-[#eee] shadow-md">
            <table className="w-[60rem] text-left text-sm">
              <thead className="bg-main uppercase text-white">
                <tr>
                  <th className="px-6 py-5">Job Title</th>
                  {/* <th className="px-6 py-5">Company Name</th> */}
                  <th className="px-6 py-5">Salary</th>
                  <th className="px-6 py-5">Location</th>
                  <th className="px-6 py-5">Employment Type</th>
                  <th className="px-6 py-5">Action</th>
                </tr>
              </thead>
              <tbody className="font-medium">
                {savedJob?.map((job) => (
                  <SavedJobsItems key={job.id} job={job} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default SavedJob;
