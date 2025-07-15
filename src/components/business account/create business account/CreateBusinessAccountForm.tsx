import { useState } from "react";
import CreateBusinessAccountStep1 from "./CreateBusinessAccountStep1";
import CreateBusinessAccountStep2 from "./CreateBusinessAccountStep2";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { IBusinessAccount } from "../../../interfaces/BusinessAccount.interfaces";
import { useCreateBusinessAccountMutation } from "../../../services/businessAccountApi";
import Loader from "../../common/Loader";
import toast from "react-hot-toast";
import { createFormData, handleApiError } from "../../../utils/helpers";
import { formSettings } from "../../../interfaces/Common.interfaces";
import { useNavigate } from "react-router-dom";

function CreateBusinessAccountForm() {
  const navigate = useNavigate();
  const [step, setStep] = useState("1");
  const [createBusinessAccount, { isLoading }] =
    useCreateBusinessAccountMutation();
  const methods = useForm<IBusinessAccount>(formSettings);
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);
  const [image, setImage] = useState<File | null>(null);

  const onSubmit: SubmitHandler<IBusinessAccount> = async (data) => {
    try {
      const currData = {
        ...data,
        logo: image,
      };
      const formData = createFormData({ ...currData } as Record<
        string,
        unknown
      >);
      const res = await createBusinessAccount(formData).unwrap();
      toast.success(res.message);
      navigate("/");
    } catch (err) {
      handleApiError(err);
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="mx-0 my-10 rounded-lg bg-[#eee] p-10 sm:mx-[4rem] md:mx-[7rem] lg:mx-[17rem]"
        >
          <p className="text-3xl">Create a business company account</p>
          <p className="text-gray-500">
            Provide us with the following information
          </p>
          {step === "2" && (
            <CreateBusinessAccountStep2
              setStep={setStep}
              updateAccount={false}
              image={image}
              setImage={setImage}
              selectedFileName={selectedFileName}
              setSelectedFileName={setSelectedFileName}
            />
          )}
          {step === "1" && (
            <CreateBusinessAccountStep1
              setStep={setStep}
              updateAccount={false}
            />
          )}
        </form>
      </FormProvider>
    </>
  );
}
export default CreateBusinessAccountForm;
