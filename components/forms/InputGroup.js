import React from "react";

export const InputGroup = ({ children }) => {
  return (
    <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:pt-5">
      {children}
    </div>
  );
};
