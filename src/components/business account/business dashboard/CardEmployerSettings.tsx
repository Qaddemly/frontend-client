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
      className={`mx-8 flex w-full flex-col gap-4 break-words rounded-lg bg-white p-5 text-xl font-medium shadow-lg ${className}`}
    >
      {children}
    </div>
  );
}

export default CardEmployerSettings;
