import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

function ExperienceCards() {
  const experiences = useSelector(
    (state: RootState) => state.user.user.experiences,
  );
  const navigate = useNavigate();
  return (
    <div className="grid grid-cols-3 p-10">
      {experiences?.map((exp) => (
        <div
          key={exp.id}
          className="w-full max-w-md cursor-pointer rounded-2xl border border-gray-200 bg-white p-5 shadow-md hover:shadow-lg"
          onClick={() => navigate(`/profile/experience/${exp.id}`)}
        >
          <h2 className="text-gray-900 text-xl font-semibold">
            {exp.job_title}
          </h2>
          <p className="text-gray-600">{exp.company_name}</p>
          <p className="text-sm text-gray-500">
            {exp.location} • {exp.location_type}
          </p>

          <div className="mt-3">
            <span className="text-blue-600 bg-blue-100 rounded-full py-1 text-sm font-medium">
              {exp.employment_type}
            </span>
          </div>

          <div className="mt-3 text-sm text-gray-700">
            <p>
              <span className="font-semibold">Start Date: </span>
              {new Date(exp.start_date).toLocaleDateString()}
            </p>
            <p>
              <span className="font-semibold">End Date: </span>
              {exp.still_working
                ? " Present"
                : exp.end_date
                  ? new Date(exp.end_date).toLocaleDateString()
                  : " N/A"}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ExperienceCards;
