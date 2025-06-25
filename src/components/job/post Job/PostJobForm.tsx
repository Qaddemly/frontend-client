import { useNavigate, useParams } from "react-router-dom";
import {
  useGetAllJobsOfBusinessQuery,
  usePostNewJobMutation,
} from "../../../services/businessDashboardApi";
import { handleApiError } from "../../../utils/helpers";
import toast from "react-hot-toast";
import JobForm from "../JobForm.tsx";

function PostJobForm({ type }: { type: "easyApply" | "externalLink" }) {
  const { companyId } = useParams();
  const [postNewJob, { isLoading }] = usePostNewJobMutation();
  const { refetch } = useGetAllJobsOfBusinessQuery({
    id: companyId || "",
    page: 1,
    limit: 9,
  });
  const navigate = useNavigate();

  const handleSubmit = async (data: any) => {
    try {
      const res = await postNewJob({
        ...data,
        business_id: companyId ? parseInt(companyId) : undefined,
      }).unwrap();
      toast.success(res.message);
      refetch();
      navigate(`/businessDashboard/companyJobs/${companyId}/active`);
    } catch (error) {
      handleApiError(error);
    }
  };

  return (
    <JobForm
      type={type}
      onSubmit={handleSubmit}
      isSubmitting={isLoading}
      submitButtonText="Post Job"
      updateForm={false}
    />
  );
}

export default PostJobForm;
