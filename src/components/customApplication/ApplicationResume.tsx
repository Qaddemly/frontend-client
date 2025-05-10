import React, { useState, useEffect } from "react";
import {
  faCloudArrowUp,
  faDeleteLeft,
} from "@fortawesome/free-solid-svg-icons";
import FileUpload from "../common/FileUpload";
import { useApplication } from "../../context/ApplicationContext";
import {
  useAddResumeMutation,
  useDeleteResumeMutation,
  useGetAllResumesQuery,
} from "../../services/profileApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IResume } from "../../interfaces/BusinessDashboard.interfaces";

function ApplicationResume() {
  const { setResume } = useApplication();
  const [addResume] = useAddResumeMutation();
  const [deleteResume] = useDeleteResumeMutation();

  const [resumes, setResumes] = useState<IResume[]>([]);
  const { data, isLoading, refetch } = useGetAllResumesQuery();

  useEffect(() => {
    if (data) {
      setResumes(data.resumes);
    }
  }, [data]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setResume(file);

    const formData = new FormData();
    formData.append("resume", file);

    try {
      await addResume({ resumes: formData });
      console.log("Resume uploaded successfully.");

      await refetch();
    } catch (error) {
      console.error("Error uploading resume:", error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteResume({ id: id.toString() });
      console.log("Resume deleted successfully.");

      setResumes(resumes.filter((resume) => resume.id !== id));
    } catch (error) {
      console.error("Error deleting resume:", error);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <FileUpload
        icon={faCloudArrowUp}
        onChange={handleFileChange}
        options={{ required: "this field is required" }}
      />

      {isLoading ? (
        <p>Loading resumes...</p>
      ) : (
        <ul>
          {resumes?.map((resume) => (
            <li key={resume.id} className="flex items-center justify-between">
              <a href={resume.url} target="_blank" rel="noopener noreferrer">
                {resume.name}
              </a>
              <button onClick={() => handleDelete(resume.id)}>
                <FontAwesomeIcon
                  icon={faDeleteLeft}
                  className="text-danger-300"
                />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ApplicationResume;
