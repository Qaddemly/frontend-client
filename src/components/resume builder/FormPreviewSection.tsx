function FormPreviewSection({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between rounded-lg bg-white px-8 py-5 shadow-md">
      {children}
    </div>
  );
}

export default FormPreviewSection;
