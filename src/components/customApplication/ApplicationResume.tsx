import React from "react";
import { useApplication } from "../../context/ApplicationContext";
import { faCloudArrowUp } from "@fortawesome/free-solid-svg-icons";
import FileUpload from "../common/FileUpload";

function ApplicationResume() {
  const { setResume } = useApplication();
  const [file, setFile] = React.useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-3xl font-bold">Upload Your Resume</h2>

      <div className="flex flex-col gap-4">
        <FileUpload
          icon={faCloudArrowUp}
          onChange={handleFileChange}
          // accept=".pdf,.doc,.docx"
        />
      </div>
    </div>
  );
}

export default ApplicationResume;
