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
      className={`flex flex-col gap-4 rounded-lg bg-white p-5 text-xl font-medium shadow-lg ${className}`}
    >
      {children}
    </div>
  );
}

export default CardEmployerSettings;
