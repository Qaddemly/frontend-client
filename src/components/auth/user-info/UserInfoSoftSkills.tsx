import { useState } from "react";
import UserInfoLayout from "../../../layout/UserInfoLayout";
import AuthButton from "../AuthButton";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AuthSelect from "../AuthSelect";
import { Languages } from "..";
import AuthInputField from "../AuthInputField";
import AuthInput from "../AuthInput";
import { useUserInfo } from "../../../context/UserInfoContext";

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
        <AuthInputField id="softSkills" label="Your skills">
          <AuthInput
            props={{
              type: "text",
              id: "softSkills",
              placeholder: "Ex. creative, problem solver,...",
              value: skill,
            }}
            onChange={(e) => setSkill(e.target.value)}
            value={skill}
          />
        </AuthInputField>

        <div className="flex justify-center">
          <AuthButton
            type="button"
            className="w-fit px-2"
            onClick={handleAddSkillsClick}
          >
            Add New Skill
          </AuthButton>
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

        <AuthSelect
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
        </AuthSelect>

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
          <AuthButton
            type="button"
            className="w-fit px-2"
            onClick={handleAddLanguagesClick}
          >
            Add New Language
          </AuthButton>
        </div>
      </div>
    </UserInfoLayout>
  );
}

export default UserInfoSoftSkills;
