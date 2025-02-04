import toast from "react-hot-toast";
import UserInfoForm from "../components/auth/user-info/UserInfoForm";
import Loader from "../components/common/Loader";
import JobDescriptionSection from "../components/job/job profile/JobDescriptionSection";
import { UserInfoProvider } from "../context/UserInfoContext";
import { useGetAllSavedJobsQuery } from "../services/jobApi";
import { handleApiError } from "../utils/helpers";

function UserInfo() {
  const { data, isLoading } = useGetAllSavedJobsQuery({});
  const job = data?.savedJobs.data;

  if (isLoading) return <Loader />;
  try {
    const formData = createFormData({ ...data } as Record<string, unknown>);
    const res = await createBusinessAccount(formData).unwrap();
    toast.success(res.message);
  } catch (err) {
    handleApiError(err);
  }

  console.log(data);

  return (
    <UserInfoProvider>
      {job && <JobDescriptionSection job={job} />}
      <UserInfoForm />
    </UserInfoProvider>
  );
}

export default UserInfo;
