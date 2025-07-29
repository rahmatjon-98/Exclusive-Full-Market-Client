import React from "react";

const ButWhite = ({ name, onClick }) => {
  console.log("ButWhite");

  return (
    <button
      onClick={onClick}
      className="border border-[#00000080] px-10 py-2 rounded "
    >
      {name}
    </button>
  );
};

export default React.memo(ButWhite);
