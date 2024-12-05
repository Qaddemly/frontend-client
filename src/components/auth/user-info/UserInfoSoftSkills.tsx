import { useState } from "react";
import UserInfoLayout from "../../../layout/UserInfoLayout";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Languages } from "..";
import Input from "../../common/Input";
import InputField from "../../common/InputField";
import { useUserInfo } from "../../../context/UserInfoContext";
import Button from "../../common/Button";
import Select from "../../common/Select";

function UserInfoSoftSkills() {
  const [skill, setSkill] = useState("");
  const [language, setLanguage] = useState<Languages | "">("");
  const languageValues = Object.values(Languages);
  const { setLanguages, setSkills, languages, skills } = useUserInfo();

  function handleAddSkillsClick() {
    if (skill.length) {
      setSkills((skills) =>
        skills.find((s) => s === skill) ? [...skills] : [...skills, skill],
      );
      setSkill("");
    }
  }

  function handleAddLanguagesClick() {
    if (language.length)
      setLanguages((langs) =>
        langs.find((s) => s === language)
          ? [...langs]
          : [...langs, language as Languages],
      );
  }

  return (
    <UserInfoLayout title="Soft Skills">
      <div className="flex flex-col gap-5 text-left">
        <InputField id="softSkills" label="Your skills">
          <Input
            props={{
              type: "text",
              id: "softSkills",
              placeholder: "Ex. creative, problem solver,...",
              value: skill,
            }}
            onChange={(e) => setSkill(e.target.value)}
            value={skill}
          />
        </InputField>

        <div className="flex justify-center">
          <Button
            type="button"
            className="w-fit px-2"
            onClick={handleAddSkillsClick}
          >
            Add New Skill
          </Button>
        </div>

        <div className="flex flex-wrap gap-2">
          {skills.map((skill, i) => (
            <div
              key={i}
              className="flex w-fit items-center gap-3 rounded-full bg-green-200 px-4 py-2 text-lg text-white"
            >
              <p>{skill}</p>
              <FontAwesomeIcon
                icon={faXmark}
                className="cursor-pointer text-xl"
                onClick={() =>
                  setSkills((skills) => skills.filter((s) => s !== skill))
                }
              />
            </div>
          ))}
        </div>

        <Select
          label="Your languages"
          id="languages"
          value={language}
          onChange={(e) => setLanguage(e.target.value as Languages)}
        >
          {languageValues.map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </Select>

        <div className="flex flex-wrap gap-2">
          {languages.map((lang, i) => (
            <div
              key={i}
              className="flex w-fit items-center gap-3 rounded-full bg-green-200 px-4 py-2 text-lg text-white"
            >
              <p>{lang}</p>
              <FontAwesomeIcon
                icon={faXmark}
                className="cursor-pointer text-xl"
                onClick={() =>
                  setLanguages((langs) => langs.filter((s) => s !== lang))
                }
              />
            </div>
          ))}
        </div>

        <div className="flex justify-center">
          <Button
            type="button"
            className="w-fit px-2"
            onClick={handleAddLanguagesClick}
          >
            Add New Language
          </Button>
        </div>
      </div>
    </UserInfoLayout>
  );
}

export default UserInfoSoftSkills;
