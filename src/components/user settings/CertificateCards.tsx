import { useNavigate } from "react-router-dom";
import Button from "../common/Button";
import ProfileCard from "../common/ProfileCard";

// we need api for get all certificates
function CertificateCards() {
  const navigate = useNavigate();
  // const certificates = useSelector(
  //   (state: RootState) => state.user.user.certificate,
  // );
  // const [deleteCertifiate, { isLoading }] = useDeleteCertificateMutation();

  // async function handleDeleteCertificate(
  //   e: React.MouseEvent<HTMLButtonElement>,
  //   id: number,
  // ) {
  //   e.stopPropagation();
  //   try {
  //     await deleteCertifiate({ id }).unwrap();
  //     toast.success("Certificate deleted successfully");
  //   } catch (error) {
  //     handleApiError(error);
  //   }
  // }

  // if (isLoading) return <Loader />;
  return (
    <div className="flex flex-col gap-20">
      <div className="grid grid-cols-2 p-10">
        {/* {certificates?.map((cer) => (
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
          title={cer.t}
        ></ProfileCard>
      ))} */}
        <ProfileCard
          startDate={"2021-01-01"}
          endDate={"2022-02-3"}
          handleDelete={() => {}}
          handleEdit={() => {}}
          key={1}
          title={"title"}
        >
          <p>skills</p>
        </ProfileCard>
      </div>
      <div className="self-end">
        <Button
          className="px-3"
          onClick={() => navigate("/userSettings/profile/certificates/0")}
        >
          Add more
        </Button>
      </div>
    </div>
  );
}

export default CertificateCards;
