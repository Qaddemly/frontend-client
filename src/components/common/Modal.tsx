import { ReactNode } from "react";

type ModalProps = {
  children: ReactNode;
  setClose: React.MouseEventHandler<HTMLButtonElement>;
};

function Modal({ children, setClose }: ModalProps) {
  return (
    <div className="absolute right-0 top-0 z-50 flex h-full w-full items-center justify-center overflow-y-auto overflow-x-hidden backdrop-blur-sm">
      <div className="relative rounded-md bg-white shadow-md">
        <button
          type="button"
          className="bg-transparent hover:text-gray-900 absolute end-2.5 top-3 ms-auto inline-flex h-8 w-8 items-center justify-center rounded-lg text-sm"
          onClick={setClose}
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
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
            />
          </svg>
          <span className="sr-only">Close modal</span>
        </button>
        {children}
      </div>
    </div>
  );
}

export default Modal;
