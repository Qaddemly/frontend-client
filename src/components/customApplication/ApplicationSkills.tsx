import { useState } from "react";
import { useApplication } from "../../context/ApplicationContext";
import { useFormContext } from "react-hook-form";
import InputField from "../common/InputField";
import Input from "../common/Input";
import Button from "../common/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

function ApplicationSkills() {
  const {
    register,
    formState: { errors },
  } = useFormContext(); // register
  const { setSkills, setLanguages, skills, languages } = useApplication();
  const [skillInput, setSkillInput] = useState("");
  const [languageInput, setLanguageInput] = useState("");

  const addSkill = () => {
    if (skillInput.trim() && !skills.includes(skillInput.trim())) {
      setSkills((prev) => [...prev, skillInput.trim()]);
      setSkillInput("");
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setSkills((prev) => prev.filter((skill) => skill !== skillToRemove));
  };

  const addLanguage = () => {
    if (languageInput.trim() && !languages.includes(languageInput.trim())) {
      setLanguages((prev) => [...prev, languageInput.trim()]);
      setLanguageInput("");
    }
  };

  const removeLanguage = (languageToRemove: string) => {
    setLanguages((prev) => prev.filter((lang) => lang !== languageToRemove));
  };

  // const onSubmit = (data: SkillsFormData) => {
  //   setApplicationData((prev) => ({
  //     ...prev,
  //     skills: data.skills || [],
  //     languages: data.languages || [],
  //   }));
  // };

  return (
    <>
      <div className="flex flex-col gap-4">
        <h3 className="text-xl font-semibold">Skills</h3>
        <div className="flex items-center gap-3">
          <InputField
            errors={errors}
            id="customSkills"
            props={{ className: "w-full" }}
          >
            <Input
              register={register}
              value={skillInput}
              name="skills"
              onChange={(e) => setSkillInput(e.target.value)}
              props={{
                type: "text",
                id: "customSkills",
                placeholder: "Skills",
              }}
            />
          </InputField>
          <Button onClick={addSkill} type="button" className="h-fit w-fit px-3">
            Add
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <div
              key={skill}
              className="flex w-fit items-center gap-3 rounded-full bg-green-200 px-4 py-2 text-lg text-white"
            >
              <p>{skill}</p>
              <FontAwesomeIcon
                icon={faXmark}
                className="cursor-pointer text-xl"
                onClick={() => removeSkill(skill)}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <h3 className="text-xl font-semibold">Languages</h3>
        <div className="flex items-center gap-3">
          <InputField
            errors={errors}
            id="customLanguages"
            props={{ className: "w-full" }}
          >
            <Input
              register={register}
              value={languageInput}
              name="languages"
              onChange={(e) => setLanguageInput(e.target.value)}
              props={{
                type: "text",
                id: "customLanguages",
                placeholder: "Languages",
              }}
            />
          </InputField>
          <Button
            onClick={addLanguage}
            type="button"
            className="h-fit w-fit px-3"
          >
            Add
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {languages.map((Language) => (
            <div
              key={Language}
              className="flex w-fit items-center gap-3 rounded-full bg-green-200 px-4 py-2 text-lg text-white"
            >
              <p>{Language}</p>
              <FontAwesomeIcon
                icon={faXmark}
                className="cursor-pointer text-xl"
                onClick={() => removeLanguage(Language)}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default ApplicationSkills;
