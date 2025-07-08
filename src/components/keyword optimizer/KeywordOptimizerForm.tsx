import { fa1, fa2, faRotate } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../common/Button";

// type OptimizationResult = {
//   summary: string;
//   recommendations: {
//     add: Array<{ section: string; content: string; reason: string }>;
//     modify: Array<{
//       section: string;
//       suggested_change: string;
//       reason: string;
//     }>;
//     remove: Array<{ section: string; reason: string }>;
//   };
//   keyword_analysis: {
//     missing_keywords: string[];
//     underrepresented_keywords: string[];
//   };
// };

function KeywordOptimizerForm() {
  const { register, handleSubmit, watch } = useForm();
  const [resumeOption, setResumeOption] = useState<
    "existing" | "upload" | null
  >(null);
  // const [existingResumes, setExistingResumes] = useState<Resume[]>([]);
  const [selectedResume, setSelectedResume] = useState<Resume | File | null>(
    null,
  );
  const [result, setResult] = useState<OptimizationResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const jobDescription = watch("jobDescription", "");

  // Fetch existing resumes from API
  // useEffect(() => {
  //   const fetchResumes = async () => {
  //     try {
  //       const response = await fetch(); // TODO GAD: API
  //       const data = await response.json();
  //       setExistingResumes(data);
  //     } catch (error) {
  //       console.error("Error fetching resumes:", error);
  //     }
  //   };

  //   fetchResumes();
  // }, []);

  // const handleUploadSuccess = (file: File) => {
  //   setSelectedResume(file);
  //   setResumeOption("upload");
  // };

  // const onSubmit = async () => {
  //   if (!selectedResume || !jobDescription) return;

  //   setIsLoading(true);

  //   try {
  //     const formData = new FormData();

  //     if (selectedResume instanceof File) {
  //       formData.append("resume_file", selectedResume);
  //     } else {
  //       formData.append("resume_id", selectedResume.id);
  //     }

  //     formData.append("job_description", jobDescription);

  //     const response = await fetch("/api/optimize", {
  //       method: "POST",
  //       body: formData,
  //     });

  //     const data = await response.json();
  //     setResult(data.optimizedKeywords);
  //   } catch (error) {
  //     console.error("Optimization error:", error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const resetForm = () => {
    setResumeOption(null);
    // setSelectedResume(null);
    setResult(null);
  };

  return (
    <div className="mx-auto max-w-4xl p-4 md:p-6">
      {result ? (
        <div className="rounded-xl bg-white p-6 shadow-md">
          <div className="mb-6">
            <h3 className="text-center text-lg font-bold md:text-left md:text-2xl">
              Summary:
            </h3>
            <p className="text-gray-600">{result.summary}</p>
          </div>

          <div className="mb-6">
            <h3 className="text-center text-lg font-bold md:text-left md:text-2xl">
              Our recommendations:
            </h3>

            {result.recommendations?.add?.length > 0 && (
              <div className="mb-4">
                <h4 className="text-md font-semibold md:text-xl">Add:</h4>
                {result.recommendations.add.map((item, index) => (
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

            {result.recommendations?.modify?.length > 0 && (
              <div className="mb-4">
                <h4 className="text-md font-semibold md:text-xl">Modify:</h4>
                {result.recommendations.modify.map((item, index) => (
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

            {result.recommendations?.remove?.length > 0 && (
              <div className="mb-4">
                <h4 className="text-md font-semibold md:text-xl">Remove:</h4>
                {result.recommendations.remove.map((item, index) => (
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
              {result.keyword_analysis?.missing_keywords?.join(", ")}{" "}
              {result.keyword_analysis?.underrepresented_keywords?.join(", ")}
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
            <h2 className="mb-4 text-center text-xl font-semibold text-gray-800 md:text-left">
              <span className="rounded-full bg-main px-2 py-1 text-white">
                <FontAwesomeIcon icon={fa1} />
              </span>{" "}
              Use Your Resume
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
                  {/* {existingResumes.map((resume) => (
                    <li key={resume.id}>
                      <button
                        className={`w-full rounded-md p-3 text-left ${
                          selectedResume?.id === resume.id
                            ? "bg-blue-100 border-blue-300 border"
                            : "hover:bg-gray-50 border border-gray-200"
                        }`}
                        onClick={() => setSelectedResume(resume)}
                      >
                        {resume.name}
                      </button>
                    </li>
                  ))} */}
                </ul>
              </div>
            )}

            {resumeOption === "upload" && (
              <div className="rounded-lg border border-gray-200 p-4">
                <UploadResumeComponent onSuccess={handleUploadSuccess} />
                <p className="mt-2 text-sm text-gray-500">
                  Max. File Size: 15MB
                </p>
              </div>
            )}
          </div>

          {/* Step 2: Job Description */}
          <div>
            <h2 className="mb-4 text-center text-xl font-semibold text-gray-800 md:text-left">
              <span className="rounded-full bg-main px-2 py-1 text-white">
                <FontAwesomeIcon icon={fa2} />
              </span>{" "}
              Add Job Description
            </h2>

            <textarea
              {...register("jobDescription")}
              placeholder="Copy and paste the job description here"
              className="h-40 w-full rounded-lg border border-gray-300 p-4 focus:border-main focus:ring-2 focus:ring-main"
            />

            {selectedResume && jobDescription && (
              <Button
                onClick={handleSubmit(onSubmit)}
                disabled={isLoading}
                className="bg-blue-600 hover:bg-blue-700 mt-6 w-full rounded-lg px-4 py-3 font-medium text-white transition duration-200 disabled:opacity-50"
              >
                Get Result
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default KeywordOptimizerForm;
