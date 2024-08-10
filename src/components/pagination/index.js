import React from "react";

const CustomPagination = ({ loading, handlePagination = () => {}, pageNumber }) => {
  return (
    <div className="py-5 flex items-center justify-end gap-5">
      <p className="font-semibold">Page No: {!loading ? pageNumber : "_"}</p>
      <button
        disabled={loading ? true : false}
        className="rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
        onClick={() => handlePagination("back")}
      >
        Back
      </button>
      <button
        disabled={loading ? true : false}
        className="rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
        onClick={() => handlePagination("next")}
      >
        Next
      </button>
    </div>
  );
};

export default CustomPagination;
