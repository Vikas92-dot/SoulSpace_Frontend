import React from "react";

const Progress = ({ value }) => {
  return (
    <div className="relative w-full bg-gray-200 rounded-full h-4 overflow-hidden">
      <div
        className="bg-green-500 h-full transition-all duration-300"
        style={{ width: `${value}%` }}
      ></div>
    </div>
  );
};

export { Progress};
