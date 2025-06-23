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
import { useGetBusinessAccountInfoQuery } from "../../../services/businessAccountApi";
import { useEffect } from "react";

function UpdateCompanyAccount() {
  const { companyId } = useParams();
  const [updateBusinessAccount, { isLoading }] =
    useUpdateBusinessAccountMutation();
  const { data } = useGetBusinessAccountInfoQuery({
    id: companyId || "",
  });
  const companyInfo = data?.business;

  const methods = useForm<IBusinessAccount>(formSettings);

  const onSubmit: SubmitHandler<IBusinessAccount> = async (data) => {
    let filteredData = Object.fromEntries(
      Object.entries(data).filter(
        ([key, value]) =>
          companyInfo?.[key as keyof IBusinessAccount] !== value &&
          value !== "" &&
          value !== null &&
          value !== undefined &&
          !(Array.isArray(value) && value.length === 0),
      ),
    );

    if (
      data.address?.city === "" ||
      companyInfo?.address?.city === data.address?.city
    ) {
      filteredData = Object.fromEntries(
        Object.entries(filteredData).filter(([key]) => key !== "address"),
      );
    }

    if (data.industry === "" || companyInfo?.industry === data.industry) {
      filteredData = Object.fromEntries(
        Object.entries(filteredData).filter(([key]) => key !== "location_type"),
      );
    }

    if (Object.keys(filteredData).length === 0) {
      toast.error("No changes detected.");
      return;
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
  };

  useEffect(() => {
    methods.reset({
      name: companyInfo?.name || "",
      description: companyInfo?.description || "",
      email: companyInfo?.email || "",
      address: {
        country: companyInfo?.address.country || undefined,
        city: companyInfo?.address.city || "",
      },
      founder: companyInfo?.founder || "",
      founded: companyInfo?.founded || "",
      company_size: companyInfo?.company_size || 0,
      headquarter: companyInfo?.headquarter || "",
      website: companyInfo?.website || "",
      logo: companyInfo?.logo || "",
      industry: companyInfo?.industry || "",
      location_type: companyInfo?.location_type || undefined,
      CEO: companyInfo?.CEO || "",
    });
  }, [
    companyInfo?.CEO,
    companyInfo?.address.city,
    companyInfo?.address.country,
    companyInfo?.company_size,
    companyInfo?.description,
    companyInfo?.email,
    companyInfo?.founder,
    companyInfo?.headquarter,
    companyInfo?.industry,
    companyInfo?.location_type,
    companyInfo?.logo,
    companyInfo?.name,
    companyInfo?.website,
    methods,
  ]);

  return (
    <FormProvider {...methods}>
      <div>
        {isLoading && <Loader />}
        <p className="px-3 text-center text-3xl font-medium">
          Update Company Information
        </p>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="mx-6 flex flex-col gap-5 lg:mx-0 lg:flex-row"
        >
          <CreateBusinessAccountStep1 updateAccount={true} />
          <CreateBusinessAccountStep2 updateAccount={true} />
        </form>
      </div>
    </FormProvider>
  );
}

export default UpdateCompanyAccount;
