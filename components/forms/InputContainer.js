import React from "react";

export const InputContainer = ({ className, children }) => {
  return (
    <div className={`mt-1 sm:mt-0 sm:col-span-2 ${className || ""}`}>
      {children}
    </div>
  );
};
