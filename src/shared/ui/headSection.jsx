import React from "react";

const HeadSection = ({ name }) => {
    console.log("HeadSection");
  return (
    <div className="flex items-center gap-5">
      <div className="bg-[#DB4444] w-5 h-8 rounded"></div>
      <p className="text-[#DB4444] font-semibold ">{name}</p>
    </div>
  );
};

export default React.memo(HeadSection);
