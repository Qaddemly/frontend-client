function Loader({ forSection = false }: { forSection?: boolean }) {
  return (
    <div
      className={`bg-slate-200/20 inset-0 z-50 flex items-center justify-center ${forSection ? "" : "absolute min-h-screen backdrop-blur-sm"}`}
    >
      <div className="loader">
        <div className="flex items-center justify-center">
          <div className="h-16 w-16 animate-spin rounded-full border-4 border-t-4 border-gray-200 border-t-main"></div>
        </div>
      </div>
    </div>
  );
}

export default Loader;
