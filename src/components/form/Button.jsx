import React from "react";

const Button = ({ primary, className, children, ...props }) => {
  return (
    <button
      {...props}
      className={`cursor-pointer font-semibold px-4 py-2 rounded-md ${
        primary ? "bg-[#c0dcf5] text-cyan-500" : "text-white bg-[#0D8F9C] shadow-xl  "
      } ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
