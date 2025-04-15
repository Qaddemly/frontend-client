import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  CoverLetterStatus,
  ICoverLetterInfo,
  ICoverLetterTemplate,
} from "../interfaces/CoverLetter.interfaces.ts";

export interface CoverLetterContextProps {
  coverLetterTemplates: ICoverLetterTemplate[];
  setCoverLetterTemplates: React.Dispatch<
    React.SetStateAction<ICoverLetterTemplate[]>
  >;
  coverLetterInfo: ICoverLetterInfo;
  setCoverLetterInfo: React.Dispatch<React.SetStateAction<ICoverLetterInfo>>;
  status: CoverLetterStatus[];
  setStatus: React.Dispatch<React.SetStateAction<CoverLetterStatus[]>>;
  currId: number;
  setCurrId: React.Dispatch<React.SetStateAction<number>>;
}

const CoverLetterContext = createContext<CoverLetterContextProps | undefined>(
  undefined,
);

export const CoverLetterProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  // const { coverLetterId } = useParams();
  ///////////////////////////////////////////// Resume Template //////////////////////////////////////////////
  const [coverLetterTemplates, setCoverLetterTemplates] = useState<
    ICoverLetterTemplate[]
  >([]);
  const [coverLetterInfo, setCoverLetterInfo] = useState<ICoverLetterInfo>(
    {} as ICoverLetterInfo,
  );
  const [status, setStatus] = useState<CoverLetterStatus[]>(
    JSON.parse(localStorage.getItem("coverLetterStatus") || '["start"]'),
  );
  const [currId, setCurrId] = useState(0);

  useEffect(() => {
    if (localStorage.getItem("coverLetterStatus")?.includes("edit")) {
      setStatus(["normal"]);
    }
  }, []);
  localStorage.setItem("coverLetterStatus", JSON.stringify(status));

  // TODO: handle api

  return (
    <CoverLetterContext.Provider
      value={{
        coverLetterTemplates,
        setCoverLetterTemplates,
        coverLetterInfo,
        setCoverLetterInfo,
        status,
        setStatus,
        currId,
        setCurrId,
      }}
    >
      {children}
    </CoverLetterContext.Provider>
  );
};

export const useCoverLetter = (): CoverLetterContextProps => {
  const context = useContext(CoverLetterContext);
  if (context === undefined) {
    throw new Error("useCoverLetter must be used within a CoverLetterProvider");
  }
  return context;
};
