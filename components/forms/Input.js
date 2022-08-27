import React from "react";

export const Input = ({ ...rest }) => {
  return (
    <input
      className="block w-full shadow-sm 
      focus:ring-antiqueBlue-500 focus:border-antiqueBlue-500 
      sm:text-sm border border-gray-300 rounded-md
      text-antiqueBlue-900
      "
      required
      {...rest}
    />
  );
};
