import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SideNavBusiness from "../business account/SideNavBusiness";
import Button from "../common/Button";
import Input from "../common/Input";
import InputField from "../common/InputField";
import { faRightLong } from "@fortawesome/free-solid-svg-icons";
import NavbarBusiness from "../business account/NavbarBusiness";
import { NavLink } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";

function PostJob1() {
  type TPost = {
    jobtitle: string;
    Number_Of_people_who_can_apply: number;
    company: string;
    Job_Location: string;
    Job_Type: string;
    Discription: string;
  };
  const submitForm: SubmitHandler<TPost> = async (data) => {
    let filteredData: Partial<TPost> = data;
    if (data.Job_Location?.length === 0)
      filteredData = Object.fromEntries(
        Object.entries(filteredData).filter(([key]) => key !== "post"),
      );
    console.log(filteredData);
  };
  const methods = useForm<TPost>();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = methods;
  return (
    <>
      <div className="flex min-h-screen">
        <SideNavBusiness />
        <div className="w-full">
          <NavbarBusiness />

          <div className="m-10 rounded-lg bg-[#eee] p-10">
            <p className="text-3xl font-medium">Post Job</p>
            <p className="text-gray-300">
              A few steps give you the power to your Job
            </p>
            <div className="mt-10 flex flex-col gap-5">
              <div className="" onSubmit={handleSubmit(submitForm)}>
                <InputField id="jobtitle" label="Job Title">
                  <Input
                    register={register}
                    props={{
                      placeholder: "job title",
                      type: "text",
                      id: "jobtitle",
                    }}
                  />
                </InputField>
              </div>

              <InputField
                id="Number Of people who can apply"
                label="Number Of people who can apply"
              >
                <Input
                  register={register}
                  props={{
                    placeholder: "Number Of people who can apply",
                    type: "text",
                    id: "Number Of people who can apply",
                  }}
                />
              </InputField>

              <InputField id="company" label="Company">
                <Input
                  register={register}
                  props={{
                    placeholder: "company",
                    type: "text",
                    id: "company",
                  }}
                />
              </InputField>

              <InputField id="Job Location" label="Job Location">
                <Input
                  register={register}
                  props={{
                    placeholder: "Job Location",
                    type: "text",
                    id: "Job Location",
                  }}
                />
              </InputField>

              <InputField id="Job Type" label="Job Type">
                <Input
                  register={register}
                  props={{
                    placeholder: "Job Type",
                    type: "text",
                    id: "Job Type",
                  }}
                />
              </InputField>

              <InputField id="Discription" label="Discription">
                <Input
                  register={register}
                  props={{
                    placeholder: "Discription",
                    type: "text",
                    id: "Discription",
                  }}
                />
              </InputField>
              <NavLink to="/postjob2">
                <Button className="ml-[1150px] mt-5 flex items-center justify-center px-8 py-2">
                  Next <FontAwesomeIcon icon={faRightLong} className="pl-2" />
                </Button>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PostJob1;
