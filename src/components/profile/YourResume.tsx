import { faCirclePlus, faFileLines } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import {
  useAddResumeMutation,
  useDeleteResumeMutation,
  useGetAllResumesQuery,
} from "../../services/profileApi";
import { createFormData, handleApiError } from "../../utils/helpers";
import Loader from "../common/Loader";
import toast from "react-hot-toast";
import Button from "../common/Button";

function YourResume() {
  const [resume, setResume] = useState<FileList | null>(null);
  const { data, refetch } = useGetAllResumesQuery();
  const [addResume, { isLoading: isLoading1 }] = useAddResumeMutation();
  const [deleteResume, { isLoading: isLoading2 }] = useDeleteResumeMutation();

  async function handleAddResume() {
    if (resume) {
      const formData = createFormData({ resumes: resume });
      try {
        await addResume({ resumes: formData }).unwrap();
        toast.success("Resume added successfully");
        refetch();
      } catch (error) {
        handleApiError(error);
      }
    }
  }

  async function handleRemoveResume(id: string) {
    try {
      await deleteResume({ id }).unwrap();
      toast.success("Resume removed successfully");
      refetch();
    } catch (error) {
      handleApiError(error);
    }
  }

  if (isLoading1 || isLoading2) return <Loader />;

  // TODO: add resume name and size
  return (
    <div className="my-20 mb-10 px-10">
      {data?.resumes.length !== 0 && (
        <p className="text-xl font-semibold">Your CV/Resumes</p>
      )}
      <ul className="mt-5 grid grid-cols-2 items-center gap-5 lg:grid-cols-3">
        {data?.resumes.map((resume) => (
          <li className="flex flex-col space-x-2 rounded-md bg-[#eee] px-5 py-3">
            <div className="flex items-center gap-5">
              <FontAwesomeIcon
                icon={faFileLines}
                className="pt-1 text-xl text-main"
              />
              <span>Professional Resume</span>
            </div>
            <div className="mt-2 flex items-center justify-between">
              <span className="px-3 pl-7 text-sm text-gray-400">3.5MB</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleRemoveResume(resume.id.toString())}
                  className="rounded-md bg-danger-300 px-2 py-1 text-sm text-white hover:bg-danger-200"
                >
                  Remove
                </button>
                <a
                  className="rounded-md bg-main px-2 py-1 text-sm text-white hover:bg-light-main"
                  href={resume.url}
                >
                  View
                </a>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-5 w-fit rounded-md">
        <label className="relative flex cursor-pointer items-center rounded-md border-2 border-dashed border-gray-300 bg-[#eee] px-3 hover:bg-light-secondary">
          <FontAwesomeIcon
            icon={faCirclePlus}
            className="mr-5 text-xl text-main"
          />
          <div className="flex flex-col items-start">
            <p className="text-gray-50 mt-2 text-sm">Add CV/Resume</p>
            <p className="mb-6 block text-sm text-gray-300">
              Browse file only pdf, doc, and docx
            </p>

            <input
              onChange={(e) => setResume(e.target.files)}
              type="file"
              className="absolute bottom-0 left-8 text-sm text-gray-500 focus:outline-none"
            />
          </div>
          {resume && (
            <Button onClick={handleAddResume} className="ml-5 px-3">
              Add
            </Button>
          )}
        </label>
      </div>
    </div>
  );
}
export default YourResume;
