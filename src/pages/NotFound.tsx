import { useNavigate } from "react-router-dom";
import Button from "../components/common/Button";
import NotFoundIcon from "../components/common/NotFoundIcon";
import Navbar from "../components/home/Navbar";

function NotFound() {
  const navigate = useNavigate();
  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center">
        <NotFoundIcon />
        <Button onClick={() => navigate("/")} className="px-3">
          Back to home
        </Button>
      </div>
    </>
  );
}

export default NotFound;
