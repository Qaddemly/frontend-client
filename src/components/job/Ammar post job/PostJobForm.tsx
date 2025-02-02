import { useState } from "react";
import Button from "../../common/Button";

function PostJobForm() {
  const [keywords, setKeywords] = useState<string[]>([]);
  const [skills, setSkills] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [skillInputValue, setSkillInputValue] = useState("");
  const [locationType, setLocationType] = useState("Location type");
  const [salary, setSalary] = useState({
    currency: "Currency",
    min: "",
    max: "",
    otherCurrency: "",
  });

  const addKeyword = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && inputValue.trim()) {
      event.preventDefault();
      setKeywords([...keywords, inputValue.trim()]);
      setInputValue("");
    }
  };

  const removeKeyword = (index: number) => {
    setKeywords(keywords.filter((_, i) => i !== index));
  };

  const addSkill = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && skillInputValue.trim()) {
      event.preventDefault();
      setSkills([...skills, skillInputValue.trim()]);
      setSkillInputValue("");
    }
  };

  const removeSkill = (index: number) => {
    setSkills(skills.filter((_, i) => i !== index));
  };
  return (
    <div className="mx-auto max-w-5xl p-8">
      <form className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* <input
          type="number"
          placeholder="Maximum number Of people who can apply"
          className="w-1/2 rounded-md border border-gray-300 p-2 focus:border-none focus:ring-main"
        /> */}

        {/* Left Column */}
        <div className="flex flex-col space-y-3">
          {/* Job Title */}
          <input
            type="text"
            placeholder="Job Title"
            className="w-full rounded-md border border-gray-300 p-2 focus:border-none focus:ring-main"
          />

          {/* Location Type */}
          <select
            className="w-full rounded-md border border-gray-300 p-2 focus:border-main"
            value={locationType}
            onChange={(e) => setLocationType(e.target.value)}
          >
            <option>Location type</option>
            <option>On-site</option>
            <option>Remote</option>
            <option>Hybrid</option>
          </select>

          {/* Location & City */}
          {locationType !== "Location type" && locationType !== "Remote" && (
            <div className="grid grid-cols-2 gap-2">
              <select className="w-full rounded-md border border-gray-300 p-2 focus:border-main">
                <option>Location</option>
                {/* GAD TODO : API for countries */}
              </select>
              <select className="w-full rounded-md border border-gray-300 p-2 focus:border-main">
                <option>City</option>
                {/* GAD TODO : API for cities */}
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
                  <button onClick={() => removeSkill(index)} className="ml-2">
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
          <select className="w-full rounded-md border border-gray-300 p-2 focus:border-main">
            <option>Employee type</option>
            <option>Full-time</option>
            <option>Part-time</option>
            <option>Intern</option>
            <option>Seasonal</option>
          </select>
        </div>

        {/* Right Column */}
        <div className="flex flex-col space-y-3">
          {/* Job Experience */}
          <select className="w-full rounded-md border border-gray-300 p-2 focus:border-main">
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
                  <button onClick={() => removeKeyword(index)} className="ml-2">
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
          />

          {/* Description */}
          <textarea
            placeholder="Description"
            className="h-24 w-full rounded-md border border-gray-300 p-2 focus:border-2 focus:border-main focus:outline-none"
          />
          <Button className="shadow-lg" onClick={() => {}}>
            Confirm
          </Button>
        </div>
      </form>
    </div>
  );
}

export default PostJobForm;
