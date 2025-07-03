import { IBasicInfo } from "../../interfaces/Auth.interfaces";

function UserProfileHeader({ basicInfo }: { basicInfo: IBasicInfo }) {
  return (
    <div className="flex items-center justify-center bg-light-secondary px-10 py-10 sm:px-20 md:justify-start md:px-10 lg:px-32">
      {/* Log, Info and Actions */}
      <div className="flex items-center justify-between">
        {/* Logo and Info Section */}
        <div className="flex items-center gap-5">
          <img
            src={basicInfo.profile_picture}
            alt="Company Logo"
            className="h-24 w-24 rounded-full border-2 border-white object-cover"
          />
          <div className="flex flex-col gap-1">
            <p className="text-xl font-semibold">
              {basicInfo.first_name} {basicInfo.last_name}
            </p>
            <p className="text-gray-500">{basicInfo.subtitle}</p>
            <p className="text-gray-500">
              {basicInfo.address.country} {basicInfo.address.city}
            </p>
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
}

export default UserProfileHeader;
