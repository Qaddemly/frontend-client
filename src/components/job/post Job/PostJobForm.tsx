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

function PostJobForm() {
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
  const [experience, setExperience] = useState("");
  const [skills, setSkills] = useState<string[]>([]);
  const [position, setPosition] = useState("");

  const { companyId } = useParams();

  const [inputValue, setInputValue] = useState("");
  const [skillInputValue, setSkillInputValue] = useState("");

  const locationTypes = Object.values(LocationType);
  const countryLocation = Object.values(Country);
  const employmentType = Object.values(EmploymentType);

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

  async function handleOnSumbit(e: React.FormEvent<HTMLFormElement>) {
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
      !position ||
      !skills.length ||
      !keywords.length
    ) {
      return;
    }

    const data = {
      title,
      description,
      location: country,
      location_type: "Onsite", // handle with backend
      salary: 5000, // GAD TODO : min, max, currency, other currency
      employee_type: "FullTime", // handle with backend
      keywords,
      experience: "2", // GAD TODO : talk with BackEnd
      business_id: companyId ? parseInt(companyId) : undefined,
      skills,
      // position, // GAD TODO : talk with BackEnd
    };
    console.log(data);
    try {
      const res = await postNewJob(data as IPostNewJobInputs).unwrap();
      toast.success(res.message);
      refetch();
      navigate(`/businessDashboard/companyJobs/${companyId}`);
    } catch (error) {
      handleApiError(error);
    }
  }

  if (isLoading) return <Loader />;

  return (
    <div className="mx-auto max-w-5xl p-8">
      <form
        className="grid grid-cols-1 gap-4 md:grid-cols-2"
        onSubmit={handleOnSumbit}
        // GAD TODO : remove onSubmit
      >
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
          {locationType !== "Location type" && locationType !== "Remote" && (
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
              <select className="w-full rounded-md border border-gray-300 p-2 focus:border-main">
                <option>City</option>
                {/* GAD TODO : input text ... talk with BackEnd */}
              </select>
            </div>
          )}

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
              onChange={(e) => setSalary({ ...salary, min: e.target.value })}
            />
            <input
              type="number"
              placeholder="Max Salary"
              className="w-full rounded-md border border-gray-300 p-2 focus:border-none focus:ring-main"
              value={salary.max}
              onChange={(e) => setSalary({ ...salary, max: e.target.value })}
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
        </div>

        {/* Right Column */}
        <div className="flex flex-col space-y-3">
          {/* Job Experience */}
          <select
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
          </select>

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

          {/* Position */}
          <input
            type="text"
            placeholder="Position"
            className="w-full rounded-md border border-gray-300 p-2 focus:border-none focus:ring-main"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
          />

          {/* Description */}
          <textarea
            placeholder="Description"
            className="h-24 w-full rounded-md border border-gray-300 p-2 focus:border-2 focus:border-main focus:outline-none"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Button className="shadow-lg">
            {/* GAD TODO : handleOnSumbit 
            onClick={(e) => handleOnSumbit(e)} */}
            Confirm
          </Button>
        </div>
      </form>
    </div>
  );
}

export default PostJobForm;
