import { useEffect, useRef } from "react";
import SuccessPng from "../assets/success.png";
import { useNavigate } from "react-router-dom";

export default function SuccessModal({ open, ...props }) {
  const dialog = useRef();
  let navigate = useNavigate();

  useEffect(() => {
    if (open) {
      dialog.current.showModal();
    } else {
      dialog.current.close();
    }
  }, [open]);

  console.log(open);

  return (
    <dialog ref={dialog} {...props}>
      {open && (
        <div className="flex flex-col items-center justify-between p-5 gap-5">
          <img src={SuccessPng} alt="success" className="h-30 w-30" />
          <h2 className="text-xl font-semibold">Payment Successful!</h2>
          <button
            className="bg-gray-200 px-5 py-2 rounded-2xl outline-none hover:cursor-pointer hover:bg-gray-300"
            onClick={() => navigate("/")}
          >
            Go To Home Page
          </button>
        </div>
      )}
    </dialog>
  );
}
