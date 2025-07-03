import { useGetArchivedJobApplicationQuery } from "../../../services/jobApi";
import JobTrackerItem from "./JobTrackerItem";
import Loader from "../../common/Loader";
// import { IJobApplication } from "../../../interfaces/BusinessDashboard.interfaces";
import JobTrackerLayout from "../../../layout/JobTrackerLayout.tsx";
import { ArchivedJobApplication } from "../../../interfaces/Job.interfaces.ts";

function JobTrackerArchived() {
  const { data, isLoading, isError } = useGetArchivedJobApplicationQuery();

  if (isLoading) return <Loader />;
  if (isError || !data || !data.archivedJobApplications)
    return <div>Error loading archived jobs.</div>;

  return (
    <JobTrackerLayout>
      {data?.archivedJobApplications?.length === 0 ? (
        <p className="mx-5 my-10 text-xl">
          No archived job applications available.
        </p>
      ) : (
        data?.archivedJobApplications?.map(
          (archivedItem: ArchivedJobApplication) => (
            <JobTrackerItem
              key={archivedItem.job_application.id}
              userType="user"
              jobApplication={{
                ...archivedItem.job_application,
                archived: archivedItem.is_archived,
                job: null,
                account: null,
                resume: [],
                job_application_state: {
                  job_application_id:
                    archivedItem.job_application.job_application_state
                      .job_application_id,
                  state:
                    archivedItem.job_application.job_application_state.state,
                  job_id: archivedItem.job_application.id,
                  is_archived: archivedItem.is_archived,
                },
              }}
            />
          ),
        )
      )}
    </JobTrackerLayout>
  );
}
export default JobTrackerArchived;
