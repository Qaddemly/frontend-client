import { useState } from "react";
import BusinessLayout from "../../../layout/BusinessLayout";
import CreateBusinessAccountStep1 from "./CreateBusinessAccountStep1";
import CreateBusinessAccountStep2 from "./CreateBusinessAccountStep2";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { formSettings } from "../../auth";
import { IBusinessAccount } from "../../../interfaces/BusinessAccount.interface";
import { useCreateBusinessAccountMutation } from "../../../services/businessAccountApi";
import Loader from "../../common/Loader";
import { IError } from "../../../interfaces/Auth.interfaces";
import toast from "react-hot-toast";
import { createFormData } from "../../../utils/helpers";

function CreateBusinessAccountForm() {
  const [next, setNext] = useState(false);
  const [createBusinessAccount, { isLoading }] =
    useCreateBusinessAccountMutation();
  const methods = useForm<IBusinessAccount>(formSettings);

  const onSubmit: SubmitHandler<IBusinessAccount> = async (data) => {
    try {
      const formData = createFormData({ ...data } as Record<string, unknown>);
      const res = await createBusinessAccount(formData).unwrap();
      toast.success(res.message);
    } catch (err) {
      const error = err as IError;
      toast.error(error.data.message);
    }

    console.log(data);
  };

  return (
    <BusinessLayout>
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
          {next ? (
            <CreateBusinessAccountStep2 updateAccount={false} />
          ) : (
            <CreateBusinessAccountStep1
              setNext={setNext}
              updateAccount={false}
            />
          )}
        </form>
      </FormProvider>
    </BusinessLayout>
  );
}
export default CreateBusinessAccountForm;
