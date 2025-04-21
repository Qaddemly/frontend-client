import React from "react";
import { faCloudArrowUp } from "@fortawesome/free-solid-svg-icons";
import FileUpload from "../common/FileUpload";

function ApplicationResume() {
  const [file, setFile] = React.useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
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
