import { Dispatch, ReactNode, SetStateAction } from "react";

type ModalProps = {
  children: ReactNode;
  setClose: Dispatch<SetStateAction<boolean>>;
};

function Modal({ children, setClose }: ModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-[#000] bg-opacity-50 backdrop-blur-sm">
      <div className="relative m-4 animate-fadeIn rounded-md bg-white shadow-md">
        <button
          type="button"
          className="bg-transparent hover:text-gray-900 absolute end-2.5 top-3 ms-auto inline-flex h-8 w-8 items-center justify-center rounded-lg text-sm"
          onClick={() => setClose(false)}
        >
          <svg
            className="h-3 w-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
            />
          </svg>
        </button>
        {children}
      </div>
    </div>
  );
}

export default Modal;
