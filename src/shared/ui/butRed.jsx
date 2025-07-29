import React from "react";

const ButRed = ({ name, onClick }) => {
  console.log("ButRed");

  return (
    <button
      onClick={onClick}
      className="px-10 py-3 rounded bg-[#DB4444] text-white"
    >
      {name}
    </button>
  );
};

export default React.memo(ButRed);
