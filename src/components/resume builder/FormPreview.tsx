import Button from "../common/Button.tsx";
import {
  faCheck,
  faFileArrowDown,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import Input from "../common/Input.tsx";
import FormPreviewSection from "./FormPreviewSection.tsx";
import ResumePersonalForm from "./forms/ResumePersonalForm.tsx";

function FormPreview() {
  const [resumeName, setResumeName] = useState("My Resume");
  const [showEditResumeName, setShowEditResumeName] = useState(false);
  return (
    <div className="flex w-1/3 flex-col gap-10">
      <FormPreviewSection>
        {showEditResumeName ? (
          <div className="flex items-center gap-5">
            <Input
              props={{ type: "text", id: "resumeName" }}
              value={resumeName}
              onChange={(e) => setResumeName(e.target.value)}
            />
            <FontAwesomeIcon
              icon={faCheck}
              className="cursor-pointer rounded-md bg-main p-2 text-lg text-white"
              onClick={() => setShowEditResumeName(false)}
            />
          </div>
        ) : (
          <p className="flex items-center gap-3 text-2xl font-medium">
            {resumeName}
            <FontAwesomeIcon
              icon={faPenToSquare}
              className="cursor-pointer text-xl text-gray-400"
              onClick={() => setShowEditResumeName(true)}
            />
          </p>
        )}
        <Button className="flex items-center gap-3 px-3">
          Download
          <FontAwesomeIcon icon={faFileArrowDown} className="text-xl" />
        </Button>
      </FormPreviewSection>

      <FormPreviewSection>
        <p className="text-lg font-semibold">Add your main content</p>
        <FontAwesomeIcon
          icon={faPenToSquare}
          className="cursor-pointer rounded-full bg-main p-2 text-xl text-white"
        />
      </FormPreviewSection>

      <ResumePersonalForm />
    </div>
  );
}

export default FormPreview;
