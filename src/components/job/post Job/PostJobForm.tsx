import { useState } from "react";
import Button from "../../common/Button";
import {
  Country,
  EmploymentType,
  LocationType,
} from "../../../enums/index.enums";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetAllJobsOfBusinessQuery,
  usePostNewJobMutation,
} from "../../../services/businessDashboardApi";
import { handleApiError } from "../../../utils/helpers";
import toast from "react-hot-toast";
import {
  IPostNewJobInputs,
  Iquestion,
} from "../../../interfaces/BusinessDashboard.interfaces";
import Loader from "../../common/Loader";
import PostJobQuestions from "./PostJobQuestions.tsx";
import PostJobExternalLink from "./PostJobExternalLink.tsx";

function PostJobForm({ type }: { type: "easyApply" | "externalLink" }) {
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

  const { companyId } = useParams();

  const [questions, setQuestions] = useState<Iquestion[]>([]);
  const [addQuestions, setAddQuestions] = useState(false);
  const [showQuestions, setShowQuestions] = useState(false);

  const [externalLink, setExternalLink] = useState("");
  const [showExternalLink, setShowExternalLink] = useState(false);

  const [inputValue, setInputValue] = useState("");
  const [skillInputValue, setSkillInputValue] = useState("");

  const locationTypes = Object.keys(LocationType);
  const countryLocation = Object.keys(Country);
  const employmentType = Object.keys(EmploymentType);

  const [postNewJob, { isLoading }] = usePostNewJobMutation();
  const { refetch } = useGetAllJobsOfBusinessQuery({
    id: companyId || "",
    page: 1,
    limit: 9,
  });
  const navigate = useNavigate();

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
      (type === "externalLink" && !externalLink) ||
      (type === "easyApply" && addQuestions && !questions.length)
    ) {
      toast.error("Please fill all required fields");
      return;
    }

    const data = {
      title,
      description,
      location: { country, city },
      location_type: locationType,
      salary: parseInt(salary.salary), // TODO : currency, other currency
      employee_type: employeeType,
      keywords,
      experience: parseInt(experience),
      business_id: companyId ? parseInt(companyId) : undefined,
      skills,
      has_extra_link_application: type === "externalLink",
      extra_application_link: type === "externalLink" ? externalLink : "",
      questions: type === "easyApply" ? questions : [],
    };
    console.log(data);
    try {
      const res = await postNewJob(data as IPostNewJobInputs).unwrap();
      toast.success(res.message);
      refetch();
      navigate(`/businessDashboard/companyJobs/${companyId}/active`);
    } catch (error) {
      handleApiError(error);
    }
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

  if (isLoading) return <Loader />;

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
                className="w-full rounded-md border border-gray-300 p-2 focus:border-none focus:ring-main"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
              />

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
                  className="w-full rounded-md border border-gray-300 p-2 focus:border-none focus:ring-main"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>

              {/* Skills */}
              <div>
                <input
                  type="text"
                  placeholder="Skills (Press enter to add)"
                  className="w-full rounded-md border border-gray-300 p-2 focus:border-none focus:ring-main"
                  value={skillInputValue}
                  onChange={(e) => setSkillInputValue(e.target.value)}
                  onKeyDown={addSkill}
                />
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

              {/* Salary */}
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="number"
                  placeholder="Salary"
                  className="w-full rounded-md border border-gray-300 p-2 focus:border-none focus:ring-main"
                  value={salary.salary}
                  onChange={(e) =>
                    setSalary({ ...salary, salary: e.target.value })
                  }
                />

                <select
                  className="w-full rounded-md border border-gray-300 p-2 focus:border-none focus:ring-main"
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
                className="w-full rounded-md border border-gray-300 p-2 focus:border-none focus:ring-main"
                onChange={(e) => setExperience(e.target.value)}
                value={experience}
              />

              {/* Keywords */}
              <div>
                <input
                  type="text"
                  placeholder="Keywords (Press enter to add)"
                  className="w-full rounded-md border border-gray-300 p-2 focus:border-none focus:ring-main"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={addKeyword}
                />
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

              {/* Description */}
              <textarea
                placeholder="Description"
                className="h-24 w-full rounded-md border border-gray-300 p-2 focus:border-2 focus:border-main focus:outline-none"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />

              {/* Questions */}
              <div
                className={`${type === "externalLink" ? "hidden" : "flex items-center gap-2 py-3"} `}
              >
                <input
                  type="checkbox"
                  checked={addQuestions}
                  onChange={(e) => setAddQuestions(e.target.checked)}
                />
                <p className="text-sm text-gray-600">Add your own questions</p>
              </div>

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
                  Confirm
                </Button>
              )}
            </div>
          </>
        )}
      </form>
    </div>
  );
}

export default PostJobForm;
