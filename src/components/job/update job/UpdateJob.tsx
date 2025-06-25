import { useParams } from "react-router-dom";
import { useUpdateJobMutation } from "../../../services/businessDashboardApi";
import { handleApiError } from "../../../utils/helpers";
import toast from "react-hot-toast";
import { useGetJobDetailsQuery } from "../../../services/jobApi";
import JobForm from "../JobForm.tsx";

function UpdateJob() {
  const { jobId } = useParams();
  const [updateJob, { isLoading }] = useUpdateJobMutation();
  const { data: jobDetails } = useGetJobDetailsQuery({ id: jobId || "" });

  const handleSubmit = async (data: any) => {
    try {
      await updateJob({ data, id: jobId || "" }).unwrap();
      toast.success("Job updated successfully");
    } catch (error) {
      handleApiError(error);
    }
  };

  return (
    <div className="my-20 flex flex-col items-center justify-center">
      <p className="my-10 text-3xl font-medium">Update job</p>
      <JobForm
        type={
          jobDetails?.job?.has_extra_link_application
            ? "externalLink"
            : "easyApply"
        }
        initialData={jobDetails?.job}
        onSubmit={handleSubmit}
        isSubmitting={isLoading}
        submitButtonText="Update Job"
        updateForm={true}
      />
    </div>
  );
}

export default UpdateJob;
