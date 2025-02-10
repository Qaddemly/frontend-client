import { useState } from "react";
import toast from "react-hot-toast";
import { handleApiError } from "../../utils/helpers";
import {
  useGetJobApplicationQuery,
  useUnSaveJobMutation,
} from "../../services/jobApi";
import Loader from "../common/Loader";
import Modal from "../common/Modal";
import { IJob } from "../../interfaces/Job.interfaces";

function AppliedJobsItem({ job }: { job: IJob }) {
  const [showDeleteModal, setDeleteShowModal] = useState(false);
  const { refetch } = useGetJobApplicationQuery({});
  const [deleteJob, { isLoading: isLoading }] = useUnSaveJobMutation();
  async function handleDelete() {
    try {
      const res = await deleteJob({
        id: job.id?.toString() || "",
      }).unwrap();
      setDeleteShowModal(false);
      refetch();
      toast.success(res.message);
    } catch (err) {
      setDeleteShowModal(false);
      handleApiError(err);
    }
  }

  if (isLoading) return <Loader />;
  return (
    <>
      <tr className="border-b border-b-[#eee] hover:bg-[#eee]">
        <th className="flex items-center gap-2 px-6 py-4">
          <span> {job?.title}</span>
        </th>
        <td className="px-6 py-4 text-gray-300"> {job?.salary} </td>
        <td className="px-6 py-4 text-gray-300">{job?.location}</td>
        <td className="px-6 py-4 text-gray-300">{job?.employee_type}</td>
        <td className="space-x-5 px-6 py-4">
          <button
            onClick={() => setDeleteShowModal(true)}
            className="rounded-full bg-danger-300 px-2 py-1 font-medium text-white"
          >
            Cancel
          </button>
          {showDeleteModal && (
            <Modal setClose={() => setDeleteShowModal(false)}>
              <div className="p-4 text-center md:p-5">
                <svg
                  className="mx-auto mb-4 h-12 w-12 text-gray-400 dark:text-gray-200"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                  Are you sure you want to delete this Job?
                </h3>
                <button
                  type="button"
                  className="inline-flex items-center rounded-lg bg-danger-300 px-5 py-2.5 text-center text-sm font-medium text-white focus:outline-none focus:ring-4"
                  onClick={() => handleDelete()}
                >
                  Yes, I'm sure
                </button>
                <button
                  type="button"
                  className="ms-3 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium focus:ring-4"
                  onClick={() => setDeleteShowModal(false)}
                >
                  No, cancel
                </button>
              </div>
            </Modal>
          )}
        </td>
      </tr>
    </>
  );
}

export default AppliedJobsItem;
