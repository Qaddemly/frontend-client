import React from "react";
import { faCloudArrowUp } from "@fortawesome/free-solid-svg-icons";
import FileUpload from "../common/FileUpload";
import { useApplication } from "../../context/ApplicationContext";

function ApplicationResume() {
  const { setResume } = useApplication();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setResume(e.target.files[0]);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <FileUpload
        icon={faCloudArrowUp}
        onChange={handleFileChange}
        // accept=".pdf,.doc,.docx"
      />
    </div>
  );
}

export default ApplicationResume;
