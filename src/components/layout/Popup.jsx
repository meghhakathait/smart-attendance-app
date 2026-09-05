import React from "react";
import Container from "../Container";
import { X } from "lucide-react";

const Popup = ({ onClose, children }) => {
  return (
    <div className=" flex flex-col justify-center items-center fixed bg-mauve-950/80 top-0 left-0 w-full h-screen ">
      <div className="w-full max-w-xl bg-[#e7f5ff] rounded-br-4xl ">
        <div className="mb-4 flex justify-end ">
          <button
            onClick={() => onClose(false)}
            className="p-4 cursor-pointer bg-[#b5f4ff] w-150 flex justify-end"
          >
            <X />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Popup;
