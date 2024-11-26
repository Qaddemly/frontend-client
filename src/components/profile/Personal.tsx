import { faImage, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AuthInput from "../auth/AuthInput";
// import YourResume from "./YourResume";
// import Head from "./Head";
import Navbar from "../home/Navbar";
import Sidebar from "./Sidebar";

function Personal() {
  return (
    <>
      <div className="mt-5">
        <Navbar />
        <Sidebar />
        {/* <Head /> */}
        <div className="mt-20 px-10">
          <span className="text-gray-500"> Profile Photo</span>
          <div className="mt-5 block h-[250px] w-[250px] items-center border-2 border-dashed bg-gray-100">
            <FontAwesomeIcon
              icon={faImage}
              className="ml-[100px] mt-[90px] text-4xl text-gray-600"
            />

            <span className="mt-3 flex items-center justify-center text-light-main underline">
              Click to upload
            </span>
            <p className="mt-3 flex items-center justify-center text-gray-500">
              Max File Size 15MB
            </p>
          </div>
        </div>

        <div className="space-x-10">
          <div className="flex space-x-3">
            <label className="font-semibold">First Name</label>
            <AuthInput
              props={{
                placeholder: "John",
                type: "text",
              }}
            />
          </div>

          <div className="flex space-x-3">
            <label className="font-semibold">Last Name</label>
            <AuthInput
              props={{
                placeholder: "Tom",
                type: "text",
              }}
            />
          </div>

          <div className="flex space-x-3">
            <label className="font-semibold">Phone</label>
            <select className="rounded-md border-2 border-gray-100 px-3 py-[7px] text-gray-300">
              <option label="+20">+20</option>
              <option label="+10">+20</option>
              <option label="+30">+20</option>
              <option label="+50">+20</option>
            </select>
            <AuthInput
              icon={faPhone}
              props={{
                placeholder: "123 456 789",
                type: "telephone",
              }}
            />
            <div className="flex space-x-3">
              <label className="font-semibold">Address</label>

              <AuthInput
                props={{
                  placeholder: "Country",
                  type: "text",
                }}
              />
              <AuthInput
                props={{
                  placeholder: "City",
                  type: "text",
                }}
              />
            </div>
            <div className="flex space-x-3">
              <label className="font-semibold">Date Of Birth</label>

              <select className="rounded-md border-2 border-gray-100 px-3 py-[7px] text-gray-300">
                <option label="DD">DD</option>
                <option label="+10">+20</option>
                <option label="+30">+20</option>
                <option label="+50">+20</option>
              </select>

              <select className="rounded-md border-2 border-gray-100 px-3 py-[7px] text-gray-300">
                <option label="MM">DD</option>
                <option label="+10">+20</option>
                <option label="+30">+20</option>
                <option label="+50">+20</option>
              </select>

              <select className="rounded-md border-2 border-gray-100 px-3 py-[7px] text-gray-300">
                <option label="DD">DD</option>
                <option label="+10">+20</option>
                <option label="+30">+20</option>
                <option label="+50">+20</option>
              </select>
            </div>
          </div>
        </div>
        <button className="mt-5 rounded-md border-2 border-main bg-main px-4 py-2 text-white">
          Save Changes
        </button>
        {/* <YourResume /> */}
      </div>
    </>
  );
}
export default Personal;
