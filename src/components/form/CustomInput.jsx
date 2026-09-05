import React from "react";

const CustomInput = ({ label, type, name, ...props }) => {
  //...props - custom k alava kuch bhi or attribute add karege to add ho jayega like disabled we use.
  return (
    <div className="flex flex-col gap-2.5 mb-3  text-[#0fa8b6] ">
      <label>{label}</label>
      <input
        type={type ? type : "text"}
        name={name}
        className="w-full h-10 outline-none border border-slate-200 rounded-md p-3 bg-[#d9effc] shadow-md"
        {...props}
      />
    </div>
  );
};

export default CustomInput;
