import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import CreateBusinessAccountStep1 from "../create business account/CreateBusinessAccountStep1";
import { IBusinessAccount } from "../../../interfaces/BusinessAccount.interfaces";
import CreateBusinessAccountStep2 from "../create business account/CreateBusinessAccountStep2";
import { createFormData, handleApiError } from "../../../utils/helpers";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import Loader from "../../common/Loader";
import { formSettings } from "../../../interfaces/Common.interfaces";
import { useUpdateBusinessAccountMutation } from "../../../services/businessDashboardApi";

function UpdateCompanyAccount() {
  const { companyId } = useParams();
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
        id: companyId || "",
        data: formData,
      }).unwrap();
      toast.success(res.message);
    } catch (err) {
      handleApiError(err);
    }
    console.log(filteredData);
  };

  return (
    <FormProvider {...methods}>
      <div>
        {isLoading && <Loader />}
        <p className="text-3xl font-medium">Update company</p>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="flex gap-5">
          <CreateBusinessAccountStep1 updateAccount={true} />
          <CreateBusinessAccountStep2 updateAccount={true} />
        </form>
      </div>
    </FormProvider>
  );
}

export default UpdateCompanyAccount;
