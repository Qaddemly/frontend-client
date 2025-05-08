import { useState } from "react";
import Button from "../../common/Button";
import {
  Country,
  EmploymentType,
  LocationType,
} from "../../../enums/index.enums";
import { useNavigate, useParams } from "react-router-dom";
import { usePostNewJobMutation } from "../../../services/businessDashboardApi";
import { handleApiError } from "../../../utils/helpers";
import toast from "react-hot-toast";
import { IPostNewJobInputs } from "../../../interfaces/BusinessDashboard.interfaces";
import Loader from "../../common/Loader";
import { useGetAllJobsQuery } from "../../../services/jobApi";
import PostJobQuestions from "./PostJobQuestions.tsx";

function PostJobForm({ type }: { type: "easyApply" | "externalLink" }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [country, setCountry] = useState("Location");
  const [locationType, setLocationType] = useState("Location type");
  const [salary, setSalary] = useState({
    currency: "Currency",
    min: "",
    max: "",
    otherCurrency: "",
  });
  const [employeeType, setEmployeeType] = useState("Employee type");
  const [keywords, setKeywords] = useState<string[]>([]);
  const [
    experience,
    //  setExperience
  ] = useState(2);
  const [skills, setSkills] = useState<string[]>([]);
  const [city, setCity] = useState("");

  const { companyId } = useParams();

  const [addQuestions, setAddQuestions] = useState(false);
  const [showQuestions, setShowQuestions] = useState(false);

  const [inputValue, setInputValue] = useState("");
  const [skillInputValue, setSkillInputValue] = useState("");

  const locationTypes = Object.keys(LocationType);
  const countryLocation = Object.keys(Country);
  const employmentType = Object.keys(EmploymentType);

  const [postNewJob, { isLoading }] = usePostNewJobMutation();
  const { refetch } = useGetAllJobsQuery({});
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

  // TODO: handle submit with questions
  async function handleOnSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (
      !title ||
      !description ||
      !country ||
      !locationType ||
      !salary.min ||
      !salary.max ||
      !salary.currency ||
      !employeeType ||
      !experience ||
      !city ||
      !skills.length ||
      !keywords.length
    ) {
      return;
    }

    const data = {
      title,
      description,
      location: { country, city },
      location_type: locationType,
      salary: 5000, // TODO GAD : min, max, currency, other currency
      employee_type: employeeType,
      keywords,
      experience: 2,
      business_id: companyId ? parseInt(companyId) : undefined,
      skills,
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

  if (isLoading) return <Loader />;

  if (type === "externalLink")
    return (
      <div className="mx-auto mt-10 w-1/2 space-y-3 text-center">
        <input
          className="w-full rounded-md border border-gray-300 p-2 focus:border-none focus:ring-main"
          placeholder="Enter your external link"
        />
        {/* TODO: handle submit with external link */}
        <Button className="w-full">Submit</Button>
      </div>
    );
  else
    return (
      <div className="mx-auto max-w-5xl p-8">
        <form
          className={`${showQuestions ? "" : "grid grid-cols-1 gap-4 md:grid-cols-2"}`}
          onSubmit={handleOnSubmit}
        >
          {showQuestions ? (
            <PostJobQuestions />
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
                    placeholder="Skills"
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
                <div className="grid grid-cols-3 gap-2">
                  <input
                    type="number"
                    placeholder="Min Salary"
                    className="w-full rounded-md border border-gray-300 p-2 focus:border-none focus:ring-main"
                    value={salary.min}
                    onChange={(e) =>
                      setSalary({ ...salary, min: e.target.value })
                    }
                  />
                  <input
                    type="number"
                    placeholder="Max Salary"
                    className="w-full rounded-md border border-gray-300 p-2 focus:border-none focus:ring-main"
                    value={salary.max}
                    onChange={(e) =>
                      setSalary({ ...salary, max: e.target.value })
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
                {/* <select
            className="w-full rounded-md border border-gray-300 p-2 focus:border-main"
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
          >
            <option>Job Experience</option>
            <option>Student</option>
            <option>Fresh Graduate (Junior)</option>
            <option>2-5 years</option>
            <option>5-10 years (Senior)</option>
            <option>10+ years</option>
          </select> */}

                {/* Keywords */}
                <div>
                  <input
                    type="text"
                    placeholder="Keywords"
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
                <div className="flex items-center gap-2 py-3">
                  <input
                    type="checkbox"
                    checked={addQuestions}
                    onChange={(e) => setAddQuestions(e.target.checked)}
                  />
                  <p className="text-sm text-gray-600">
                    Add your own questions
                  </p>
                </div>

                {addQuestions ? (
                  <Button
                    type="button"
                    className="shadow-lg"
                    onClick={() => setShowQuestions(true)}
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
