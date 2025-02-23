import { ReactNode } from "react";

function CardEmployerSettings({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`mx-8 flex flex-col items-center gap-4 rounded-lg bg-white p-5 text-xl font-medium shadow-lg lg:mx-0 lg:items-start ${className}`}
    >
      {children}
    </div>
  );
}

export default CardEmployerSettings;
