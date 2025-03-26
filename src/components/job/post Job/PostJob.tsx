import PostJobForm from "./PostJobForm";

function PostJob() {
  return (
    <>
      <h2 className="m-4 pt-2 text-center text-3xl font-bold">
        Post your Job 💼
      </h2>
      <p className="m-4 text-center text-2xl opacity-50">
        Few steps give the power to your Job
      </p>
      <PostJobForm />
    </>
  );
}

export default PostJob;
