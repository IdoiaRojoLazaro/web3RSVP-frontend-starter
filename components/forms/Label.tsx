import React from "react";

interface Props extends React.ComponentPropsWithoutRef<"label"> {
  description?: string;
}

export const Label = ({ className, description, children, ...rest }: Props) => {
  return (
    <label
      className={`block text-sm font-medium text-gray-700 dark:text-antiqueBlue-100 sm:mt-px sm:pt-2 ${className}`}
      {...rest}
    >
      {children}
      {description && (
        <p className="mt-1 max-w-2xl text-sm text-gray-400">{description}</p>
      )}
    </label>
  );
};
