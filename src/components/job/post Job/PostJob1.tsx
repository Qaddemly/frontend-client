import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { NavLink } from "react-router-dom";
import SideNavBusiness from "../../business account/SideNavBusiness";
import InputField from "../../common/InputField";
import Input from "../../common/Input";
import Button from "../../common/Button";
import { faRightLong } from "@fortawesome/free-solid-svg-icons";
import NavbarBusiness from "../../business account/NavbarBusiness";
import { SubmitHandler, useForm } from "react-hook-form";
import { IPostData } from "../../../interfaces/Job.interfaces";

function PostJob1() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IPostData>();
  const submitForm: SubmitHandler<IPostData> = async (data) => {
    console.log(data);
  };

  return (
    <>
      <div className="flex min-h-screen">
        <SideNavBusiness />
        <div className="w-full">
          <NavbarBusiness />

          <div className="m-10 rounded-lg bg-[#eee] p-10">
            <p className="text-3xl font-medium">Post Job</p>
            <p className="text-gray-300">
              Few steps give the power to your Job
            </p>
            <form
              onSubmit={handleSubmit(submitForm)}
              className="mt-10 flex flex-col gap-5"
            >
              <div className="">
                <InputField errors={errors} id="jobtitle" label="Job Title">
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
                errors={errors}
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

              <InputField errors={errors} id="company" label="Company">
                <Input
                  register={register}
                  props={{
                    placeholder: "company",
                    type: "text",
                    id: "company",
                  }}
                />
              </InputField>

              <InputField
                errors={errors}
                id="Job Location"
                label="Job Location"
              >
                <Input
                  register={register}
                  props={{
                    placeholder: "Job Location",
                    type: "text",
                    id: "Job Location",
                  }}
                />
              </InputField>

              <InputField errors={errors} id="Job Type" label="Job Type">
                <Input
                  register={register}
                  props={{
                    placeholder: "Job Type",
                    type: "text",
                    id: "Job Type",
                  }}
                />
              </InputField>

              <InputField errors={errors} id="Discription" label="Discription">
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
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default PostJob1;
