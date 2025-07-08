import KeywordOptimizerForm from "../components/keyword optimizer/KeywordOptimizerForm";
import MainLayout from "../layout/MainLayout";

function KeywordOptimizer() {
  return (
    <MainLayout>
      <div className="bg-background pb-10 pt-20 text-center">
        <h2 className="text-lg font-bold sm:text-2xl md:text-4xl">
          Optimize your resume
        </h2>
        <p className="pt-2">
          We will check your resume score based on the job description
        </p>
        <KeywordOptimizerForm />
      </div>
    </MainLayout>
  );
}

export default KeywordOptimizer;
