import React from "react";
import { btnTypeClasses } from "../../utils/btnTypeClasses";

const Button = ({ children, className, onClick, type, ...rest }: React.ComponentPropsWithoutRef<"button">) => {
  return (
    <button
      className={`p-2 rounded-md hover:ring-2 hover:ring-gray-300
      ${btnTypeClasses(type)}
      ${className || ""}
      `}
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;