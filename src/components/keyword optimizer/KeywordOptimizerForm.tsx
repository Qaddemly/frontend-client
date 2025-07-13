import {
  fa1,
  fa2,
  faCloudArrowUp,
  faRotate,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import Button from "../common/Button";
import FileUpload from "../common/FileUpload.tsx";
import {
  IOptimizedKeywords,
  IOptimizedKeywordsResponse,
} from "../../interfaces/KeywordOptimizer.interfaces.ts";
import {
  useKeywordOptimizationMutation,
  useKeywordOptimizationWithPdfMutation,
} from "../../services/keywordOptimizerApi.tsx";
import { createFormData, handleApiError } from "../../utils/helpers.ts";
import toast from "react-hot-toast";
import { useGetAllResumeTemplatesQuery } from "../../services/resumeBuilderApi.ts";
import { IResumeTemplate } from "../../interfaces/ResumeBuilder.interfaces.ts";

function KeywordOptimizerForm() {
  const [resumeOption, setResumeOption] = useState<
    "existing" | "upload" | null
  >(null);
  const { data } = useGetAllResumeTemplatesQuery();
  const allResumes = data?.data || [];
  const [selectedResume, setSelectedResume] = useState<IResumeTemplate | null>(
    null,
  );
  const [selectedResumePdf, setSelectedResumePdf] = useState<File | null>(null);
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);
  const [jobDescription, setJobDescription] = useState<string>("");
  const [result, setResult] = useState<IOptimizedKeywords | null>(null);

  const [keywordOptimization] = useKeywordOptimizationMutation();
  const [keywordOptimizationWithPdf] = useKeywordOptimizationWithPdfMutation();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setSelectedResumePdf(file);
    setSelectedFileName(file.name);
  };
  console.log(result);

  const resetForm = () => {
    setResumeOption(null);
    setSelectedResume(null);
    setSelectedResumePdf(null);
    setSelectedFileName(null);
    setJobDescription("");
    setResult(null);
  };

  async function handleGetResult() {
    const handleRequest = async (
      promise: Promise<IOptimizedKeywordsResponse>,
    ) => {
      try {
        toast.promise(promise, {
          loading: "Generating result",
          success: "Result generated successfully",
          error: "Could not generate result",
        });

        const res = await promise;
        setResult(res?.optimizedKeywords);
        setResumeOption(null);
        setJobDescription("");
      } catch (error) {
        handleApiError(error);
      }
    };

    if (resumeOption === "existing") {
      const promise = keywordOptimization({
        resumeId: selectedResume?.id || 0,
        jobDescription,
      }).unwrap();

      await handleRequest(promise);
    } else {
      const data = {
        resume_pdf: selectedResumePdf,
        job_description: jobDescription,
      };
      const formData = createFormData(data);

      const promise = keywordOptimizationWithPdf({
        data: formData,
      }).unwrap();

      await handleRequest(promise);
    }
  }

  return (
    <div className="mx-auto max-w-4xl p-4 md:p-6">
      {result ? (
        <div className="rounded-xl bg-white p-6 shadow-md">
          <div className="mb-6">
            <h3 className="text-center text-lg font-bold md:text-left md:text-2xl">
              Summary:
            </h3>
            <p className="text-gray-600">{result?.summary}</p>
          </div>

          <div className="mb-6">
            <h3 className="text-center text-lg font-bold md:text-left md:text-2xl">
              Our recommendations:
            </h3>

            {result?.recommendations?.add?.length > 0 && (
              <div className="mb-4">
                <h4 className="text-md font-semibold md:text-xl">Add:</h4>
                {result?.recommendations?.add?.map((item, index) => (
                  <div key={index} className="mb-3 ml-4">
                    <p>
                      <span className="font-medium">Section:</span>{" "}
                      {item.section}
                    </p>
                    <p>
                      <span className="font-medium">Content:</span>{" "}
                      {item.content}
                    </p>
                    <p>
                      <span className="font-medium">Reason:</span> {item.reason}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {result?.recommendations?.modify?.length > 0 && (
              <div className="mb-4">
                <h4 className="text-md font-semibold md:text-xl">Modify:</h4>
                {result?.recommendations?.modify?.map((item, index) => (
                  <div key={index} className="mb-3 ml-4">
                    <p>
                      <span className="font-medium">Section:</span>{" "}
                      {item.section}
                    </p>
                    <p>
                      <span className="font-medium">Suggested change:</span>{" "}
                      {item.suggested_change}
                    </p>
                    <p>
                      <span className="font-medium">Reason:</span> {item.reason}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {result?.recommendations?.remove?.length > 0 && (
              <div className="mb-4">
                <h4 className="text-md font-semibold md:text-xl">Remove:</h4>
                {result?.recommendations?.remove?.map((item, index) => (
                  <div key={index} className="mb-3 ml-4">
                    <p>
                      <span className="font-medium">Section:</span>{" "}
                      {item.section}
                    </p>
                    <p>
                      <span className="font-medium">Reason:</span> {item.reason}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            <h3 className="text-center text-lg font-bold md:text-left md:text-2xl">
              Suggested keywords:
            </h3>
            <p className="mb-1">
              <span className="font-medium">Missing:</span>{" "}
              {result?.keyword_analysis?.missing_keywords?.join(", ")}{" "}
              {result?.keyword_analysis?.underrepresented_keywords?.join(", ")}
            </p>
          </div>
          <Button
            onClick={resetForm}
            className="bg-blue-600 hover:bg-blue-700 mt-6 w-full rounded-lg px-4 py-3 font-medium text-white transition duration-200"
          >
            <FontAwesomeIcon icon={faRotate} /> Check again
          </Button>
        </div>
      ) : (
        <div className="rounded-lg bg-white p-6 shadow-md">
          {/* Step 1: Resume Selection */}
          <div className="mb-8">
            <h2 className="mb-4 flex items-center gap-2 text-center text-xl font-semibold text-gray-800 md:text-left">
              <span>
                <FontAwesomeIcon
                  icon={fa1}
                  className="rounded-full bg-main px-3 py-2 text-white"
                />
              </span>
              <span>Use Your Resume</span>
            </h2>

            <div className="mb-6 flex flex-col gap-4 md:flex-row">
              <Button
                className={`w-full rounded-xl border border-main px-2 py-2 text-sm md:text-lg ${
                  resumeOption === "existing"
                    ? "bg-main text-white"
                    : "bg-white text-main hover:bg-main hover:text-white"
                }`}
                onClick={() => setResumeOption("existing")}
              >
                Choose existing resume
              </Button>

              <Button
                className={`w-full rounded-xl border border-main px-2 py-2 text-sm md:text-lg ${
                  resumeOption === "upload"
                    ? "bg-main text-white"
                    : "bg-white text-main hover:bg-main hover:text-white"
                }`}
                onClick={() => setResumeOption("upload")}
              >
                Upload from your device
              </Button>
            </div>

            {resumeOption === "existing" && (
              <div className="rounded-lg border border-gray-200 p-4">
                <h3 className="mb-3 font-medium">Your Resumes</h3>
                <ul className="space-y-2">
                  {allResumes?.map((resume) => (
                    <li key={resume.id} className="hover:bg-gray-100">
                      <button
                        className={`w-full rounded-md p-3 text-left ${
                          selectedResume?.id === resume.id
                            ? "border border-main bg-main text-white"
                            : "hover:bg-gray-50 border border-gray-200"
                        }`}
                        onClick={() => setSelectedResume(resume)}
                      >
                        {resume.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {resumeOption === "upload" && (
              <div className="rounded-lg border border-gray-200 p-4">
                <FileUpload
                  icon={faCloudArrowUp}
                  onChange={handleFileChange}
                  fileName={selectedFileName}
                />
              </div>
            )}
          </div>

          {/* Step 2: Job Description */}
          <div>
            <h2 className="mb-4 flex items-center gap-2 text-center text-xl font-semibold text-gray-800 md:text-left">
              <span>
                <FontAwesomeIcon
                  icon={fa2}
                  className="rounded-full bg-main px-3 py-2 text-white"
                />
              </span>
              <span>Add Job Description</span>
            </h2>

            <textarea
              className="h-[10rem] w-full rounded-md border border-gray-300 p-4 focus:border-main focus:outline-none focus:ring-1 focus:ring-main"
              placeholder="Copy and paste the job description here"
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
            />

            {(selectedResume && jobDescription) ||
            (selectedResumePdf && jobDescription) ? (
              <Button
                onClick={handleGetResult}
                // disabled={isLoading}
                className="mt-6 w-full rounded-lg px-4 py-3 font-medium text-white transition duration-200 disabled:opacity-50"
              >
                Get Result
              </Button>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
}

export default KeywordOptimizerForm;
