import JobTrackerHeader from "./JobTrackerHeader";
import JobTrackerItem from "./JobTrackerItem";

function JobTrackerBusiness() {
  return (
    <div className="min-h-screen bg-[#eee] p-10">
      <JobTrackerHeader userType="business" />
      <JobTrackerItem userType="business" />
      <JobTrackerItem userType="business" />
    </div>
  );
}

export default JobTrackerBusiness;
