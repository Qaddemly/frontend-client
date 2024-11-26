import { useState } from "react";
import UserInfoLayout from "../../../layout/UserInfoLayout";
import { UserInfoStep } from "../../../types/index.types";
import AuthButton from "../AuthButton";
import AuthInput from "../AuthInput";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AuthSelect from "../AuthSelect";
import AuthPrevAndSkipButtons from "../AuthPrevAndSkipButtons";

function UserInfoSoftSkills({ setStep }: UserInfoStep) {
  const [skill, setSkill] = useState("");
  const [skills, setSkills] = useState<string[]>([]);
  const [language, setLanguage] = useState("");
  const [languages, setLanguages] = useState<string[]>([]);

  function handleAddSkillsClick() {
    setSkills((skills) =>
      skills.find((s) => s === skill) ? [...skills] : [...skills, skill],
    );
    setSkill("");
  }

  function handleAddLanguagesClick() {
    if (!language.length) return;
    setLanguages((langs) =>
      languages.find((s) => s === language) ? [...langs] : [...langs, language],
    );
  }

  return (
    <UserInfoLayout title="Soft Skills">
      <div className="flex flex-col gap-5 text-left">
        <AuthInput
          label="Your skills"
          props={{
            type: "text",
            id: "skills",
            placeholder: "Ex. creative, problem solver,...",
            value: skill,
          }}
          onChange={(e) => setSkill(e.target.value)}
        />

        <div className="flex justify-center">
          <AuthButton className="w-fit px-2" onClick={handleAddSkillsClick}>
            Add New Skill
          </AuthButton>
        </div>

        <div className="flex flex-wrap gap-2">
          {skills.map((skill, i) => (
            <div
              key={i}
              className="text-white flex w-fit items-center gap-3 rounded-full bg-green-200 px-4 py-2 text-lg"
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
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option>Select Language</option>
          <option value="English">English</option>
          <option value="French">French</option>
          <option value="German">German</option>
          <option value="Chinese">Chinese</option>
          <option value="Japanese">Japanese</option>
          <option value="Korean">Korean</option>
          <option value="Arabic">Arabic</option>
          <option value="Portuguese">Portuguese</option>
          <option value="Russian">Russian</option>
          <option value="Italian">Italian</option>
          <option value="Dutch">Dutch</option>
          <option value="Hindi">Hindi</option>
          <option value="Bengali">Bengali</option>
          <option value="Turkish">Turkish</option>
        </AuthSelect>

        <div className="flex flex-wrap gap-2">
          {languages.map((lang, i) => (
            <div
              key={i}
              className="text-white flex w-fit items-center gap-3 rounded-full bg-green-200 px-4 py-2 text-lg"
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
          <AuthButton className="w-fit px-2" onClick={handleAddLanguagesClick}>
            Add New Language
          </AuthButton>
        </div>

        <AuthPrevAndSkipButtons setStep={setStep} />
      </div>
    </UserInfoLayout>
  );
}

export default UserInfoSoftSkills;
