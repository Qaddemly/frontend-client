import React, { useState, useEffect } from "react";
import { faCloudArrowUp } from "@fortawesome/free-solid-svg-icons";
import FileUpload from "../common/FileUpload";
import { useApplication } from "../../context/ApplicationContext";
import { useGetAllResumesQuery } from "../../services/profileApi";
import { IResume } from "../../interfaces/BusinessDashboard.interfaces";

function ApplicationResume() {
  const { setResume } = useApplication();

  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);
  const [resumes, setResumes] = useState<IResume[]>([]);
  const { data, isLoading } = useGetAllResumesQuery();

  useEffect(() => {
    if (data) {
      setResumes(data.resumes);
    }
  }, [data]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setResume(file);
    setSelectedFileName(file.name);
    const formData = new FormData();
    formData.append("resume", file);
  };

  const handleResumeSelect = async (resume: IResume) => {
    try {
      const response = await fetch(resume.url);
      const blob = await response.blob();
      const file = new File([blob], resume.name, { type: blob.type });
      setResume(file);
      setSelectedFileName(file.name);
    } catch (error) {
      console.error("Failed to load resume file", error);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <FileUpload
        icon={faCloudArrowUp}
        onChange={handleFileChange}
        fileName={selectedFileName}
        options={{ required: "this field is required" }}
      />

      {isLoading ? (
        <p>Loading resumes...</p>
      ) : (
        <ul>
          <p>Your resumes</p>
          {resumes?.map((resume) => (
            <li
              key={resume.id}
              className="flex cursor-pointer items-center justify-between gap-2 rounded-md bg-[#eee] p-3"
              onClick={() => handleResumeSelect(resume)}
            >
              {resume.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ApplicationResume;
