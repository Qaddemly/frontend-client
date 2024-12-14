import Button from "../common/Button";
import Input from "../common/Input";
import InputField from "../common/InputField";
// import NavProfile from "../profile/NavProfile";

function PostJob1() {
  return (
    <div>
      {/* <NavProfile /> */}
      <div>
        <p className="ml-8 mt-5 text-3xl font-semibold">Post Job</p>
        <p className="ml-10 mt-2">A few steps give you the power to your Job</p>
        <div className="m-auto my-20 flex w-1/2 flex-col items-center justify-center gap-3 rounded-xl bg-gray-200 py-10">
          <InputField id="jobtitle" label="Job Title">
            <Input
              props={{
                placeholder: "job title",
                type: "text",
                id: "jobtitle",
              }}
            />
          </InputField>

          <InputField
            id="Number Of people who can apply"
            label="Number Of people who can apply"
          >
            <Input
              props={{
                placeholder: "Number Of people who can apply",
                type: "text",
                id: "Number Of people who can apply",
              }}
            />
          </InputField>

          <InputField id="company" label="Company">
            <Input
              props={{
                placeholder: "company",
                type: "text",
                id: "company",
              }}
            />
          </InputField>

          <InputField id="Job Location" label="Job Location">
            <Input
              props={{
                placeholder: "Job Location",
                type: "text",
                id: "Job Location",
              }}
            />
          </InputField>

          <InputField id="Job Type" label="Job Type">
            <Input
              props={{
                placeholder: "Job Type",
                type: "text",
                id: "Job Type",
              }}
            />
          </InputField>

          <InputField id="Discription" label="Discription">
            <Input
              props={{
                placeholder: "Discription",
                type: "text",
                id: "Discription",
              }}
            />
          </InputField>
          <Button className="ml-[600px] px-2 py-1">Next</Button>
        </div>
      </div>
    </div>
  );
}

export default PostJob1;
