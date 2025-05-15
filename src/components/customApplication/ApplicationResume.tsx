import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCloudArrowUp,
  faDeleteLeft,
} from "@fortawesome/free-solid-svg-icons";
import FileUpload from "../common/FileUpload";
import { useApplication } from "../../context/ApplicationContext";
import { IResume } from "../../interfaces/BusinessDashboard.interfaces";

function ApplicationResume() {
  const { setResume } = useApplication();
  const [resume, setResumeState] = useState<IResume | null>(null);
  const [resumes, setResumes] = useState<IResume[]>([]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const newResume: IResume = {
      id: new Date().getTime(),
      name: file.name,
      url: URL.createObjectURL(file),
      size: file.size,
      accountId: 0,
    };

    setResumeState(newResume);
    setResume(newResume);
    setResumes((prevResumes) => [...prevResumes, newResume]);
  };

  const handleDelete = (id: number) => {
    setResumes(resumes.filter((resume) => resume.id !== id));
  };

  useEffect(() => {
    if (resume) {
      console.log("Resume set successfully:", resume);
    }
  }, [resume]);

  return (
    <div className="flex flex-col gap-4">
      <FileUpload
        icon={faCloudArrowUp}
        onChange={handleFileChange}
        options={{ required: "this field is required" }}
      />

      <div className="mt-4">
        {resume ? (
          <p>Resume uploaded: {resume?.name}</p>
        ) : (
          <p>No resume uploaded yet.</p>
        )}

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
      </div>
    </div>
  );
}

export default ApplicationResume;
