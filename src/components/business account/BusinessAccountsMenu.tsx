import { useNavigate } from "react-router-dom";
import Button from "../common/Button";

import { RefObject } from "react";

function BusinessAccountsMenu({
  menuRef,
}: {
  menuRef: RefObject<HTMLUListElement>;
}) {
  const navigate = useNavigate();
  return (
    <ul
      //   onClick={() => navigate(`/employerSettings/companyAccount/${id}`)}
      ref={menuRef}
      className="absolute top-[4rem] flex min-h-[15rem] flex-col justify-between rounded-md border bg-white pb-5 shadow-lg"
    >
      {/* {data?.businesses.map((b) => <li>{b.name}</li>)} */}
      <li className="flex cursor-pointer flex-col rounded-tl-md rounded-tr-md border-b border-gray-100 px-4 py-2 font-medium hover:bg-[#eee]">
        Company name <span className="italic text-gray-300">Role</span>
      </li>
      <Button
        onClick={() => navigate("/createBusinessAccount")}
        className="mx-5 px-4"
      >
        Create new company
      </Button>
    </ul>
  );
}

export default BusinessAccountsMenu;
