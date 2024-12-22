import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import CreateBusinessAccountStep1 from "../create business account/CreateBusinessAccountStep1";
import { IBusinessAccount } from "../../../interfaces/BusinessAccount.interface";
import { formSettings } from "../../auth";
import CreateBusinessAccountStep2 from "../create business account/CreateBusinessAccountStep2";
import { createFormData } from "../../../utils/helpers";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { useUpdateBusinessAccountMutation } from "../../../services/businessAccountApi";
import Loader from "../../common/Loader";
import { IError } from "../../../interfaces/Common.interface";

function UpdateCompanyAccount() {
  const { id } = useParams();
  const [updateBusinessAccount, { isLoading }] =
    useUpdateBusinessAccountMutation();
  const methods = useForm<IBusinessAccount>(formSettings);

  const onSubmit: SubmitHandler<IBusinessAccount> = async (data) => {
    let filteredData = Object.fromEntries(
      Object.entries(data).filter(
        ([, value]) =>
          value !== "" &&
          value !== null &&
          value !== undefined &&
          value.length !== 0,
      ),
    );
    if (data.address.city === "") {
      filteredData = Object.fromEntries(
        Object.entries(filteredData).filter(([key]) => key !== "address"),
      );
    }
    if (data.industry === "") {
      filteredData = Object.fromEntries(
        Object.entries(filteredData).filter(([key]) => key !== "location_type"),
      );
    }
    const formData = createFormData(filteredData);
    try {
      const res = await updateBusinessAccount({
        id: Number(id),
        data: formData,
      }).unwrap();
      toast.success(res.message);
    } catch (err) {
      const error = err as IError;
      toast.error(error.message);
    }
    console.log(filteredData);
  };

  return (
    <FormProvider {...methods}>
      {isLoading && <Loader />}
      <p className="text-3xl font-medium">Update company</p>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="flex gap-5">
        <CreateBusinessAccountStep1 updateAccount={true} />
        <CreateBusinessAccountStep2 updateAccount={true} />
      </form>
    </FormProvider>
  );
}

export default UpdateCompanyAccount;
