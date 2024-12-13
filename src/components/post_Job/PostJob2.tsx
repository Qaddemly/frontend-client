import Button from "../common/Button";
import Input from "../common/Input";
import InputField from "../common/InputField";

function PostJob2() {
  return (
    <div>
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

        <Button className="ml-[600px] px-2 py-1">Post</Button>
      </div>
    </div>
  );
}
export default PostJob2;
