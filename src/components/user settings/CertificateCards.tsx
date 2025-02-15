import { useNavigate } from "react-router-dom";
import ProfileCard from "../common/ProfileCard";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useDeleteCertificateMutation } from "../../services/profileApi";
import toast from "react-hot-toast";
import { handleApiError } from "../../utils/helpers";
import Loader from "../common/Loader";

function CertificateCards() {
  const naviagate = useNavigate();
  const certificates = useSelector(
    (state: RootState) => state.user.user.certificate,
  );
  const [deleteCertifiate, { isLoading }] = useDeleteCertificateMutation();

  async function handleDeleteCertificate(
    e: React.MouseEvent<HTMLButtonElement>,
    id: number,
  ) {
    e.stopPropagation();
    try {
      await deleteCertifiate({ id }).unwrap();
      toast.success("Certificate deleted successfully");
    } catch (error) {
      handleApiError(error);
    }
  }

  if (isLoading) return <Loader />;
  return (
    <div className="grid grid-cols-2 p-10">
      {certificates?.map((cer) => (
        <ProfileCard
          startDate={cer.start_date}
          endDate={cer.end_date}
          handleDelete={(e: React.MouseEvent<HTMLButtonElement>) =>
            handleDeleteCertificate(e, cer.id)
          }
          handleEdit={() =>
            naviagate(`/userSettings/profile/certificate/${cer.id}`)
          }
          key={cer.id}
          title={cer.title}
        >
          <p className="text-gray-600">{cer.issuing_organization}</p>
          <div className="mt-3">
            <span className="text-blue-600 bg-blue-100 rounded-full py-1 text-sm font-medium">
              {cer.media}
            </span>
          </div>
        </ProfileCard>
      ))}
    </div>
  );
}

export default CertificateCards;
