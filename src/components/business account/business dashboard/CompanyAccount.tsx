import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CardEmployerSettings from "./CardEmployerSettings";
import {
  faEnvelope,
  faLocationDot,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { useGetBusinessAccountInfoQuery } from "../../../services/businessAccountApi";
import { useParams } from "react-router-dom";
import Loader from "../../common/Loader";

// this page need more handling for ui
function CompanyAccount() {
  const { companyId } = useParams();
  const { data, isLoading } = useGetBusinessAccountInfoQuery({
    id: Number(companyId),
  });
  const companyInfo = data?.business;

  return (
    <div className="w-[50rem]">
      {isLoading && <Loader />}
      <div className="font-medium">
        <p className="text-3xl">About company</p>
        <p className="text-gray-300">
          Your name and role may be visible to job seekers and other members of
          your company
        </p>
      </div>
      <div className="mt-10 flex gap-10">
        <div className="flex w-1/2 flex-col gap-5">
          <CardEmployerSettings className="items-center justify-center">
            <p>{companyInfo?.name}</p>
          </CardEmployerSettings>
          <CardEmployerSettings>
            <p>Contact</p>
            <div className="flex items-center gap-2 text-gray-300">
              <FontAwesomeIcon icon={faEnvelope} />
              <p>{companyInfo?.email ? companyInfo.email : "No email added"}</p>
            </div>

            <div className="flex items-center gap-2 text-gray-300">
              <FontAwesomeIcon icon={faPhone} />
              <p>{companyInfo?.phone ? companyInfo.phone : "No phone added"}</p>
            </div>
            <div className="flex items-center gap-2 text-gray-300">
              <FontAwesomeIcon icon={faLocationDot} />
              <p>
                {companyInfo?.address.country}, {companyInfo?.address.city}
              </p>
            </div>
          </CardEmployerSettings>
        </div>
        <div className="flex w-full flex-col gap-5">
          <CardEmployerSettings>
            <p className="text-md font-medium">Website</p>
            <p className="text-gray-300">
              {companyInfo?.website ? companyInfo.website : "No websited added"}
            </p>
          </CardEmployerSettings>
          <CardEmployerSettings>
            <p className="text-md font-medium">Industry</p>
            <p className="text-gray-300">{companyInfo?.industry}</p>
          </CardEmployerSettings>
          <CardEmployerSettings>
            <p className="text-md font-medium">Headquarter</p>
            <p className="text-gray-300">{companyInfo?.headquarter}</p>
          </CardEmployerSettings>
          <CardEmployerSettings>
            <p className="text-md font-medium">CEO</p>
            <p className="text-gray-300">{companyInfo?.CEO}</p>
          </CardEmployerSettings>
          <CardEmployerSettings>
            <p className="text-md font-medium">Company size</p>
            <p className="text-gray-300">{companyInfo?.company_size}</p>
          </CardEmployerSettings>
        </div>
      </div>
    </div>
  );
}

export default CompanyAccount;
