import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePlus } from "@fortawesome/free-solid-svg-icons";
import Modal from "../common/Modal.tsx";
import Button from "../common/Button.tsx";
import { useCoverLetter } from "../../context/CoverLetterContext.tsx";
import { useNavigate } from "react-router-dom";
import {
  useAddCoverLetterMutation,
  useDeleteCoverLetterMutation,
  useGetCoverLettersQuery,
} from "../../services/coverLetterBuilderApi.ts";
import { ediTimeAgo, handleApiError } from "../../utils/helpers.ts";
import toast from "react-hot-toast";

function AddCoverLetter() {
  const { coverLetterTemplates, setCoverLetterTemplates, setStatus } =
    useCoverLetter();
  const navigate = useNavigate();
  const [coverLetterName, setCoverLetterName] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [addCoverLetter] = useAddCoverLetterMutation();
  const [deleteCoverLetter] = useDeleteCoverLetterMutation();
  const { refetch } = useGetCoverLettersQuery();
  const isCoverLetterUrl = location.href.includes("coverLetterBuilder");

  useEffect(() => {
    if (isCoverLetterUrl) setStatus(["addCoverLetter"]);
  }, [isCoverLetterUrl, setStatus]);

  async function handleAddCoverLetterTemplate() {
    try {
      const res = addCoverLetter({
        data: { name: coverLetterName },
      }).unwrap();
      await toast.promise(res, {
        loading: "Creating cover letter",
        success: "Cover letter created successfully",
        error: "Could not create cover letter",
      });
      setShowModal(false);
      const { coverLetter } = await res;
      setCoverLetterTemplates((prev) => [...prev, { ...coverLetter }]);
      refetch();
    } catch (error) {
      handleApiError(error);
    }
  }

  async function handleDeleteCoverLetterTemplate(id: string) {
    try {
      const res = deleteCoverLetter({ id }).unwrap();
      await toast.promise(res, {
        loading: "Deleting cover letter",
        success: "Cover letter deleted successfully",
        error: "Could not delete cover letter",
      });
      setShowModal(false);
      setCoverLetterTemplates((prev) =>
        prev.filter((coverLetter) => coverLetter?.id?.toString() !== id),
      );
    } catch (error) {
      handleApiError(error);
    }
  }

  return (
    <div className="flex gap-10">
      <div
        onClick={() => setShowModal(true)}
        className="flex h-[400px] w-[18rem] cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border border-dashed bg-white p-14 py-24 text-gray-500 transition-all hover:scale-105 hover:shadow-md"
      >
        <FontAwesomeIcon icon={faSquarePlus} className="text-2xl" />
        <p>New cover letter</p>
      </div>

      {showModal && (
        <Modal setClose={setShowModal}>
          <div className="flex w-[40rem] flex-col p-10">
            <p className="text-xl font-semibold">Create New cover letter</p>
            <p className="my-2 text-gray-300">
              Add a title for your new cover letter
            </p>
            <input
              value={coverLetterName}
              onChange={(e) => setCoverLetterName(e.target.value)}
              type="text"
              className="h-10 rounded-md border border-gray-100 px-5 py-5"
              placeholder="Ex.Full Stack cover letter"
            />
            <div className="mt-5 flex gap-5 self-end">
              <Button
                onClick={() => setShowModal(false)}
                className="text-black bg-white px-3 hover:bg-[#eee]"
              >
                Cancel
              </Button>

              <Button onClick={handleAddCoverLetterTemplate} className="px-3">
                Create
              </Button>
            </div>
          </div>
        </Modal>
      )}

      {coverLetterTemplates?.map((coverLetter) => (
        <div
          key={coverLetter.id}
          onClick={() => {
            setStatus(["normal"]);
            navigate(`/coverLetterBuilder/edit/${coverLetter.id}`);
          }}
        >
          <div className="h-[400px] w-[18rem] cursor-pointer flex-col items-center justify-center gap-2 break-words rounded-lg bg-white p-5 text-center text-[10px] shadow-sm transition-all hover:scale-105 hover:shadow-md">
            <h2 className="text-center font-bold">
              {coverLetter.personalDetails?.full_name}
            </h2>
            <h2 className="text-center font-medium">
              {coverLetter.personalDetails?.job_title}
            </h2>
            <h2 className="text-center font-normal">
              {coverLetter.personalDetails?.address}
            </h2>
            <div className="flex justify-center gap-5">
              <h2 className="font-normal">
                {coverLetter.personalDetails?.email}
              </h2>
              <h2 className="font-normal">
                {coverLetter.personalDetails?.phone_number}
              </h2>
            </div>
            {coverLetter.personalDetails && (
              <div className="mt-1 space-y-3">
                {Array.from({ length: 23 }).map((_, index) => (
                  <hr key={index} className="border-gray-200" />
                ))}
              </div>
            )}
          </div>

          <div className="mt-5 flex items-center justify-between">
            <div>
              <p className="text-lg font-semibold">{coverLetter.name}</p>
              <p className="text-sm text-gray-300">
                {ediTimeAgo(coverLetter?.updated_at || "")}
              </p>
            </div>

            <Button
              onClick={(e) => {
                e.stopPropagation();
                handleDeleteCoverLetterTemplate(
                  coverLetter?.id?.toString() || "",
                );
              }}
              className="border border-danger-300 bg-background px-4 text-danger-300 hover:bg-danger-300 hover:text-white"
            >
              Delete
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default AddCoverLetter;
