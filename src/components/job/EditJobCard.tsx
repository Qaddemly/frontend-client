import { useNavigate, useParams } from "react-router-dom";
import Button from "../common/Button";
import EditJobCardItem from "./EditJobCardItem";

type EditJobCardProps = {
  active: boolean;
  jobTitle?: string;
  locationType?: string;
  location?: string;
  salary?: string;
  skills?: string[];
  employmentType?: string;
  experience?: string;
  keyWords?: string[];
  position?: string;
  decsription?: string;
};

function EditJobCard({
  active,
  jobTitle,
  locationType,
  location,
  salary,
  skills,
  employmentType,
  experience,
  keyWords,
  position,
  decsription,
}: EditJobCardProps) {
  const navigate = useNavigate();
  const { companyId, jobId } = useParams();

  return (
    <div
      className={`${active ? "border-green-100" : "border-danger-300"} max-w-md cursor-pointer rounded-xl border-2 bg-offWhite p-4 shadow-lg transition-all duration-100 hover:translate-x-1 hover:shadow-gray-400`}
      onClick={() =>
        navigate(
          `/businessDashboard/companyJobs/${companyId}/jobApplications/${jobId}`,
        )
      } // id will change
    >
      <h3 className="text-lg font-medium text-gray-800">
        Job title: {jobTitle}
      </h3>
      <EditJobCardItem title="Location type:" content={locationType} />
      <EditJobCardItem title="Location:" content={location} />
      <EditJobCardItem title="Salary:" content={salary} />
      <EditJobCardItem title="Skills:" content={skills?.join(", ")} />
      <EditJobCardItem title="Employment type:" content={employmentType} />
      <EditJobCardItem title="Job experience:" content={experience} />
      <EditJobCardItem title="Key words:" content={keyWords?.join(", ")} />
      <EditJobCardItem title="Position:" content={position} />
      <EditJobCardItem title="Description:" content={decsription} />

      <div className="mt-4 flex justify-between pl-1">
        <Button
          onClick={(e) => {
            e.stopPropagation();
            navigate("/businessDashboard/updatejob/1");
          }}
          className="border border-main bg-white px-3 text-base text-main hover:bg-main hover:text-white md:text-sm lg:text-base"
        >
          Edit
        </Button>
        <Button className="border border-main bg-white px-1 text-base text-main hover:bg-main hover:text-white md:text-sm lg:text-base">
          {active ? "Set Unavailable" : "Set Available"}
        </Button>
        <Button className="border border-main bg-white px-1 text-base text-main hover:bg-main hover:text-white md:text-sm lg:text-base">
          Archive
        </Button>
        <Button className="border border-main bg-white px-1 text-base text-main hover:bg-main hover:text-white md:text-sm lg:text-base">
          Delete
        </Button>
      </div>
    </div>
  );
}

export default EditJobCard;
