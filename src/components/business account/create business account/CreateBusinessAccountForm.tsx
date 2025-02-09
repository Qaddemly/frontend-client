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

function CreateBusinessAccountForm() {
  const [step, setStep] = useState("1");
  const [createBusinessAccount, { isLoading }] =
    useCreateBusinessAccountMutation();
  const methods = useForm<IBusinessAccount>(formSettings);

  const onSubmit: SubmitHandler<IBusinessAccount> = async (data) => {
    console.log(data);
    try {
      const formData = createFormData({ ...data } as Record<string, unknown>);
      const res = await createBusinessAccount(formData).unwrap();
      toast.success(res.message);
    } catch (err) {
      handleApiError(err);
    }

    console.log(data);
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
