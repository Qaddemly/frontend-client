import { Outlet } from "react-router-dom";
import BusinessLayout from "../../../layout/BusinessLayout";

function BusinessDashboard() {
  return (
    <BusinessLayout>
      <Outlet />
    </BusinessLayout>
  );
}

export default BusinessDashboard;
