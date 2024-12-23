import { SubmitHandler, useForm } from "react-hook-form";
import {
  Country,
  EmploymentType,
  formSettings,
  LocationType,
} from "../../auth";
import Input from "../../common/Input";
import InputField from "../../common/InputField";
import Select from "../../common/Select";
import Button from "../../common/Button";

interface IUpdateJob {
  title: string;
  locationType: LocationType;
  salary: number;
  employmentType: EmploymentType;
  location: Country;
  description: string;
  keywords: string[];
  skills: string[];
  business_id: number;
  experience: string;
}

function UpdateJob() {
  const locationValues = Object.values(Country);
  const locationTypeValues = Object.values(LocationType);
  const employmentTypeValues = Object.values(EmploymentType);
  //   const { jobId } = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUpdateJob>(formSettings);

  const onSubmit: SubmitHandler<IUpdateJob> = (data) => {
    console.log(data);
  };

  return (
    <div>
      <p className="text-3xl font-medium">Update job</p>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-5 flex gap-5">
        {/* left side */}
        <div className="flex w-[25rem] flex-col gap-3 border-r border-r-gray-100 pr-8">
          <InputField errors={errors} id="title">
            <Input
              register={register}
              name="title"
              options={{ required: "this field is required" }}
              props={{
                type: "text",
                id: "title",
                placeholder: "Enter company title",
              }}
            />
          </InputField>

          <Select register={register} name="locationType" id="locationType">
            {locationTypeValues.map((value) => (
              <option value={value} key={value}>
                {value}
              </option>
            ))}
          </Select>

          {/* Location must be country and city in backend */}
          <div className="flex gap-5">
            <Select
              register={register}
              name="location"
              id="location"
              errors={errors}
            >
              {locationValues.map((value) => (
                <option value={value} key={value}>
                  {value}
                </option>
              ))}
            </Select>
            {/* <InputField ="City" id="address.city" >
              <Input
                register={register}
                options={
                  { required: "this field is required" }
                }
                name="address.city"
                props={{
                  type: "text",
                  id: "address.city",
                  placeholder: "City",
                }}
              />
            </InputField> */}
          </div>

          <InputField errors={errors} id="skills">
            <Input
              register={register}
              name="skills"
              options={{ required: "this field is required" }}
              props={{
                type: "string",
                id: "skills",
                placeholder: "Enter salary",
              }}
            />
          </InputField>

          <InputField errors={errors} id="salary">
            <Input
              register={register}
              name="salary"
              options={{ required: "this field is required" }}
              props={{
                type: "number",
                id: "salary",
                placeholder: "Enter salary",
              }}
            />
          </InputField>

          <Select register={register} name="employmentType" id="employmentType">
            {employmentTypeValues.map((value) => (
              <option value={value} key={value}>
                {value}
              </option>
            ))}
          </Select>
        </div>

        {/* right side */}
        <div className="flex w-[25rem] flex-col gap-3">
          <InputField errors={errors} id="experience">
            <Input
              register={register}
              name="experience"
              options={{ required: "this field is required" }}
              props={{
                type: "number",
                id: "experience",
                placeholder: "Enter experiences",
              }}
            />
          </InputField>
          <InputField errors={errors} id="keywords">
            <Input
              register={register}
              name="keywords"
              options={{ required: "this field is required" }}
              props={{
                type: "number",
                id: "keywords",
                placeholder: "Enter keywords",
              }}
            />
          </InputField>

          <div className="flex flex-col gap-2">
            <textarea
              {...register("description")}
              className="min-h-[15rem] rounded-md bg-[#eee] p-5 outline-none"
              placeholder="Enter company description"
            />
          </div>
          <Button className="px-3">Submit</Button>
        </div>
      </form>
    </div>
  );
}

export default UpdateJob;
