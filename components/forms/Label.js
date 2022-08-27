import React from "react";

export const Label = ({ htmlFor, className, description, children }) => {
  return (
    <label
      htmlFor={htmlFor}
      className={`block text-sm font-medium text-gray-700 dark:text-antiqueBlue-100 sm:mt-px sm:pt-2 ${className}`}
    >
      {children}
      {description && (
        <p className="mt-1 max-w-2xl text-sm text-gray-400">{description}</p>
      )}
    </label>
  );
};
