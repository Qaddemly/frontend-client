import BusinessLayout from "../../layout/BusinessLayout";
import { Country, LocationType } from "../auth";
import Button from "../common/Button";
import Input from "../common/Input";
import InputField from "../common/InputField";
import Select from "../common/Select";

function CreateBusinessAccount() {
  const locationValues = Object.values(Country);
  const locationTypeValues = Object.values(LocationType);
  return (
    <BusinessLayout>
      <div className="mx-[13rem] my-10 rounded-lg bg-[#eee] p-10">
        <p className="text-3xl">Create a business company account</p>
        <p className="text-gray-500">
          Provide us with the following information
        </p>
        <div className="mt-10 flex gap-5">
          <div className="flex w-full flex-col gap-5">
            <InputField label="Company name" id="companyName">
              <Input props={{ type: "text", id: "companyName" }} />
            </InputField>
            <InputField label="Company email" id="companyEmail">
              <Input props={{ type: "email", id: "companyEmail" }} />
            </InputField>
            <InputField label="Company industry" id="companyIndustry">
              <Input props={{ type: "text", id: "companyIndustry" }} />
            </InputField>

            <Select label="Location" id="location">
              {locationValues.map((value) => (
                <option value={value} key={value}>
                  {value}
                </option>
              ))}
            </Select>
            <Select label="Location type" id="locationType">
              {locationTypeValues.map((value) => (
                <option value={value} key={value}>
                  {value}
                </option>
              ))}
            </Select>

            <div className="flex flex-col gap-2">
              <label htmlFor="companyDescription">Company Description</label>
              <textarea className="min-h-28 p-5 outline-none"></textarea>
            </div>
          </div>
          <div className="flex w-full flex-col gap-5">
            <InputField label="Company phone number" id="companyPhoneNumber">
              <Input props={{ type: "number", id: "companyPhoneNumber" }} />
            </InputField>
            <InputField label="Company website" id="companyWebsite">
              <Input props={{ type: "text", id: "companyWebsite" }} />
            </InputField>
            <InputField label="Company size" id="companySize">
              <Input props={{ type: "text", id: "companySize" }} />
            </InputField>
            <InputField label="Company head quarter" id="companyHeadQuarter">
              <Input props={{ type: "text", id: "companyHeadQuarter" }} />
            </InputField>
          </div>
        </div>
        <div className="text-right">
          <Button className="px-3">Submit</Button>
        </div>
      </div>
    </BusinessLayout>
  );
}
export default CreateBusinessAccount;
