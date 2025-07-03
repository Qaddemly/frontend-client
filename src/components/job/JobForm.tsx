import { useState, useEffect } from "react";

import toast from "react-hot-toast";
import {
  Country,
  EmploymentType,
  LocationType,
} from "../../enums/index.enums.ts";
import Loader from "../common/Loader.tsx";
import PostJobQuestions from "./post Job/PostJobQuestions.tsx";
import PostJobExternalLink from "./post Job/PostJobExternalLink.tsx";
import Button from "../common/Button.tsx";
import { IQuestion } from "../../interfaces/Job.interfaces.ts";
import GenerateOrEnhanceButton from "../common/GenerateOrEnhanceButton.tsx";
import {
  useEnhanceJobPostDescriptionMutation,
  useEnhanceOrGenerateJobPostKeywordsMutation,
  useEnhanceOrGenerateJobPostSkillsMutation,
  useGenerateJobPostMutation,
} from "../../services/businessDashboardApi.ts";
import { handleApiError } from "../../utils/helpers.ts";

interface JobFormProps {
  type: "easyApply" | "externalLink";
  initialData?: {
    title: string;
    description: string;
    country: string;
    city: string;
    location_type: string;
    salary: number;
    salary_currency?: string;
    employee_type: string;
    keywords: string[];
    experience: number;
    skills: string[];
    questions?: IQuestion[];
    has_extra_link_application?: boolean;
    extra_application_link?: string;
  };
  onSubmit: (data: any) => Promise<void>;
  isSubmitting: boolean;
  submitButtonText: string;
  updateForm: boolean;
}

function JobForm({
  type,
  initialData,
  onSubmit,
  isSubmitting,
  submitButtonText,
  updateForm,
}: JobFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [country, setCountry] = useState("Location");
  const [locationType, setLocationType] = useState("Location type");
  const [salary, setSalary] = useState({
    currency: "Currency",
    salary: "",
    otherCurrency: "",
  });
  const [employeeType, setEmployeeType] = useState("Employee type");
  const [keywords, setKeywords] = useState<string[]>([]);
  const [experience, setExperience] = useState("");
  const [skills, setSkills] = useState<string[]>([]);
  const [city, setCity] = useState("");
  const [questions, setQuestions] = useState<IQuestion[]>([]);
  const [addQuestions, setAddQuestions] = useState(false);
  const [showQuestions, setShowQuestions] = useState(false);
  const [externalLink, setExternalLink] = useState("");
  const [showExternalLink, setShowExternalLink] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [skillInputValue, setSkillInputValue] = useState("");

  const locationTypes = Object.keys(LocationType);
  const countryLocation = Object.keys(Country);
  const employmentType = Object.keys(EmploymentType);

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || "");
      setDescription(initialData.description || "");
      setCountry(initialData?.country || "Location");
      setLocationType(initialData.location_type || "Location type");
      setSalary({
        currency: initialData.salary_currency || "Currency",
        salary: initialData.salary?.toString() || "",
        otherCurrency: "",
      });
      setEmployeeType(initialData.employee_type || "Employee type");
      setKeywords(initialData.keywords || []);
      setExperience(initialData.experience?.toString() || "");
      setSkills(initialData.skills || []);
      setCity(initialData?.city || "");
      setQuestions(initialData.questions || []);
      setAddQuestions((initialData.questions?.length || 0) > 0);
      setExternalLink(initialData.extra_application_link || "");
    }
  }, [initialData]);

  const addKeyword = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      if (inputValue.trim()) {
        setKeywords([...keywords, inputValue.trim()]);
        setInputValue("");
      }
    }
  };

  const removeKeyword = (index: number) => {
    setKeywords(keywords.filter((_, i) => i !== index));
  };

  const addSkill = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      if (skillInputValue.trim()) {
        setSkills([...skills, skillInputValue.trim()]);
        setSkillInputValue("");
      }
    }
  };

  const removeSkill = (index: number) => {
    setSkills(skills.filter((_, i) => i !== index));
  };

  async function handleOnSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (
      !title ||
      !description ||
      !country ||
      !locationType ||
      !salary.salary ||
      !salary.currency ||
      !employeeType ||
      !experience ||
      !city ||
      !skills.length ||
      !keywords.length ||
      (type === "externalLink" && !externalLink && !updateForm) ||
      (type === "easyApply" && addQuestions && !questions.length && !updateForm)
    ) {
      toast.error("Please fill all required fields");
      return;
    }

    const data = {
      title,
      description,
      location: { country, city },
      location_type: locationType,
      salary: parseInt(salary.salary),
      salary_currency:
        salary.currency === "Other" ? salary.otherCurrency : salary.currency,
      employee_type: employeeType,
      keywords,
      experience: parseInt(experience),
      skills,
      has_extra_link_application: type === "externalLink",
      extra_application_link: type === "externalLink" ? externalLink : "",
      questions: type === "easyApply" ? questions : [],
    };

    await onSubmit(data);
  }

  const handleQuestionsSubmit = () => {
    handleOnSubmit({
      preventDefault: () => {},
    } as React.FormEvent<HTMLFormElement>);
  };

  const handleExternalLinkSubmit = () => {
    handleOnSubmit({
      preventDefault: () => {},
    } as React.FormEvent<HTMLFormElement>);
  };

  //////////////////// Post Enhancement (AI Feature) ////////////////////
  const [prompt, setPrompt] = useState("");

  const [enhanceJobPostDescription] = useEnhanceJobPostDescriptionMutation();
  const [enhanceOrGenerateJobPostSkills] =
    useEnhanceOrGenerateJobPostSkillsMutation();
  const [enhanceOrGenerateJobPostKeywords] =
    useEnhanceOrGenerateJobPostKeywordsMutation();
  const [generateJobPost] = useGenerateJobPostMutation();

  async function handleEnhanceDescription() {
    if (description.length > 0) {
      try {
        const promise = enhanceJobPostDescription({
          data: { title, description },
        }).unwrap();
        toast.promise(promise, {
          loading: "Enhancing description",
          success: "Description enhanced successfully",
          error: "Could not enhance description",
        });
        const res = await promise;
        const enhancedDescription = res?.enhancedDescription?.description;
        if (enhancedDescription) {
          setDescription(enhancedDescription);
        }
      } catch (error) {
        handleApiError(error);
      }
    }
  }

  async function handleEnhanceOrGenerateSkills() {
    try {
      const promise = enhanceOrGenerateJobPostSkills({
        data: { title, description, skills },
      }).unwrap();
      toast.promise(promise, {
        loading: `${skills.length > 0 ? "Enhancing" : "Generating"}  skills`,
        success: `Skills ${skills.length > 0 ? "enhanced" : "generated"} successfully`,
        error: `Could not ${skills.length > 0 ? "enhance" : "generate"} skills`,
      });
      const res = await promise;
      const enhancedSkills = res?.enhancedSkills?.skills;
      if (enhancedSkills) {
        setSkills(enhancedSkills);
      }
    } catch (error) {
      handleApiError(error);
    }
  }

  async function handleEnhanceOrGenerateKeywords() {
    try {
      const promise = enhanceOrGenerateJobPostKeywords({
        data: { title, description, keywords },
      }).unwrap();
      toast.promise(promise, {
        loading: `${keywords.length > 0 ? "Enhancing" : "Generating"}  keywords`,
        success: `Keywords ${keywords.length > 0 ? "enhanced" : "generated"} successfully`,
        error: `Could not ${keywords.length > 0 ? "enhance" : "generate"} keywords`,
      });
      const res = await promise;
      const enhancedKeywords = res?.enhancedKeywords?.keywords;
      if (enhancedKeywords) {
        setKeywords(enhancedKeywords);
      }
    } catch (error) {
      handleApiError(error);
    }
  }

  async function handleGenerateJobPost() {
    if (prompt.length > 0) {
      try {
        const promise = generateJobPost({
          data: { prompt },
        }).unwrap();
        toast.promise(promise, {
          loading: "Generating details",
          success: "Details generated successfully",
          error: "Could not generate details",
        });
        const res = await promise;
        const generatedDetails = res?.generatedJobPost;
        if (generatedDetails) {
          setTitle(generatedDetails.title);
          setDescription(generatedDetails.description);
          setSkills(generatedDetails.skills);
          setKeywords(generatedDetails.keywords);
        }
        setPrompt("");
      } catch (error) {
        handleApiError(error);
      }
    }
  }

  if (isSubmitting) return <Loader />;

  return (
    <div className="mx-auto max-w-5xl p-8">
      <form
        className={`${showQuestions || showExternalLink ? "" : "grid grid-cols-1 gap-4 md:grid-cols-2"}`}
        onSubmit={handleOnSubmit}
      >
        {showQuestions ? (
          <PostJobQuestions
            questions={questions}
            setQuestions={setQuestions}
            onSubmit={handleQuestionsSubmit}
            onBack={() => setShowQuestions(false)}
          />
        ) : showExternalLink ? (
          <PostJobExternalLink
            externalLink={externalLink}
            setExternalLink={setExternalLink}
            onSubmit={handleExternalLinkSubmit}
            onBack={() => setShowExternalLink(false)}
          />
        ) : (
          <>
            {/* Left Column */}
            <div className="flex flex-col space-y-3">
              {/* Job Title */}
              <input
                type="text"
                placeholder="Job Title"
                className="w-full rounded-md border border-gray-300 p-2 focus:border-main focus:outline-none focus:ring-1 focus:ring-main"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
              />

              {/* Description */}
              <div className="relative">
                <textarea
                  placeholder="Description"
                  className="h-[13rem] w-full rounded-md border border-gray-300 p-2 focus:border-main focus:outline-none focus:ring-1 focus:ring-main"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />

                {!updateForm && description.length > 5 && title.length > 0 && (
                  <GenerateOrEnhanceButton
                    text="Enhance description with AI"
                    className="bottom-4 right-5"
                    onClick={handleEnhanceDescription}
                  />
                )}
              </div>

              {/* Location Type */}
              <select
                className="w-full rounded-md border border-gray-300 p-2 focus:border-main"
                value={locationType}
                onChange={(e) => setLocationType(e.target.value)}
              >
                <option disabled>Location type</option>
                {locationTypes.map((locationType) => (
                  <option key={locationType} value={locationType}>
                    {locationType}
                  </option>
                ))}
              </select>

              {/* Location & City */}
              <div className="grid grid-cols-2 gap-2">
                <select
                  className="w-full rounded-md border border-gray-300 p-2 focus:border-main"
                  onChange={(e) => setCountry(e.target.value)}
                  value={country}
                >
                  <option disabled>Location</option>
                  {countryLocation.map((country) => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))}
                </select>

                <input
                  type="text"
                  placeholder="City"
                  className="w-full rounded-md border border-gray-300 p-2 focus:border-main focus:outline-none focus:ring-1 focus:ring-main"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>
            </div>

            {/* Right Column */}
            <div className="flex flex-col space-y-3">
              {/* Employment type */}
              <select
                className="w-full rounded-md border border-gray-300 p-2 focus:border-main"
                value={employeeType}
                onChange={(e) => setEmployeeType(e.target.value)}
              >
                <option disabled>Employee type</option>
                {employmentType.map((employmentType) => (
                  <option key={employmentType} value={employmentType}>
                    {employmentType}
                  </option>
                ))}
              </select>

              {/* Job Experience */}
              <input
                type="number"
                placeholder="Experience"
                className="w-full rounded-md border border-gray-300 p-2 focus:border-main focus:outline-none focus:ring-1 focus:ring-main"
                onChange={(e) => setExperience(e.target.value)}
                value={experience}
              />

              {/* Salary */}
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="number"
                  placeholder="Salary"
                  className="w-full rounded-md border border-gray-300 p-2 focus:border-main focus:outline-none focus:ring-1 focus:ring-main"
                  value={salary.salary}
                  onChange={(e) =>
                    setSalary({ ...salary, salary: e.target.value })
                  }
                />

                <select
                  className="w-full rounded-md border border-gray-300 p-2 focus:border-main focus:outline-none focus:ring-1 focus:ring-main"
                  value={salary.currency}
                  onChange={(e) =>
                    setSalary({ ...salary, currency: e.target.value })
                  }
                >
                  <option>Currency</option>
                  <option>USD</option>
                  <option>EUR</option>
                  <option>EGP</option>
                  <option>Other</option>
                </select>
                {salary.currency === "Other" && (
                  <input
                    type="text"
                    placeholder="Enter currency"
                    className="w-full rounded-md border border-gray-300 p-2 focus:border-none focus:ring-main"
                    value={salary.otherCurrency}
                    onChange={(e) =>
                      setSalary({ ...salary, otherCurrency: e.target.value })
                    }
                  />
                )}
              </div>

              {/* Skills */}
              <div>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Skills (Press enter to add)"
                    className="w-full rounded-md border border-gray-300 p-5 focus:border-main focus:outline-none focus:ring-1 focus:ring-main"
                    value={skillInputValue}
                    onChange={(e) => setSkillInputValue(e.target.value)}
                    onKeyDown={addSkill}
                  />
                  {!updateForm &&
                    description.length > 5 &&
                    title.length > 0 && (
                      <GenerateOrEnhanceButton
                        text={`${skills.length === 0 ? "Generate" : "Enhance"} skills with AI`}
                        className="bottom-2 right-2"
                        onClick={handleEnhanceOrGenerateSkills}
                      />
                    )}
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {skills.map((skill, index) => (
                    <div
                      key={index}
                      className="flex items-center rounded-full bg-green-200 px-3 py-1 text-white hover:bg-green-100"
                    >
                      {skill}{" "}
                      <button
                        type="button"
                        onClick={() => removeSkill(index)}
                        className="ml-2"
                      >
                        x
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Keywords */}
              <div>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Keywords (Press enter to add)"
                    className="w-full rounded-md border border-gray-300 p-5 focus:border-main focus:outline-none focus:ring-1 focus:ring-main"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={addKeyword}
                  />
                  {!updateForm &&
                    description.length > 5 &&
                    title.length > 0 && (
                      <GenerateOrEnhanceButton
                        text={`${keywords.length === 0 ? "Generate" : "Enhance"} keywords with AI`}
                        className="bottom-2 right-2"
                        onClick={handleEnhanceOrGenerateKeywords}
                      />
                    )}
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {keywords.map((keyword, index) => (
                    <div
                      key={index}
                      className="flex items-center rounded-full bg-green-200 px-3 py-1 text-white hover:bg-green-100"
                    >
                      {keyword}{" "}
                      <button
                        type="button"
                        onClick={() => removeKeyword(index)}
                        className="ml-2"
                      >
                        x
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Questions */}
              {!updateForm && (
                <div
                  className={`${type === "externalLink" ? "hidden" : "flex items-center gap-2 py-3"}`}
                >
                  <input
                    type="checkbox"
                    checked={addQuestions}
                    onChange={(e) => setAddQuestions(e.target.checked)}
                  />
                  <p className="text-sm text-gray-600">
                    Add your own questions
                  </p>
                </div>
              )}

              {addQuestions ? (
                <Button
                  type="button"
                  className="shadow-lg"
                  onClick={() => setShowQuestions(true)}
                >
                  Next
                </Button>
              ) : type === "externalLink" ? (
                <Button
                  type="button"
                  className="shadow-lg"
                  onClick={() => setShowExternalLink(true)}
                >
                  Next
                </Button>
              ) : (
                <Button type="submit" className="shadow-lg">
                  {submitButtonText}
                </Button>
              )}
            </div>
          </>
        )}
      </form>

      <div className="relative mt-10">
        <input
          className="w-full rounded-md border border-gray-300 p-4 focus:border-main focus:outline-none focus:ring-1 focus:ring-main"
          placeholder="Tell me about the job and I will do everything for you"
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <GenerateOrEnhanceButton
          className="bottom-2 right-5"
          text="Generate all details with AI"
          noAnimation={true}
          onClick={handleGenerateJobPost}
        />
      </div>
    </div>
  );
}

export default JobForm;
