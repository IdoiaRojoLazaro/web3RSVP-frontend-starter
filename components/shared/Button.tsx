import React from "react";
import { btnTypeClasses, BtnTypes } from "../../utils/btnTypeClasses";
import joinClassNames from "../../utils/joinClassNames";

interface Props extends React.ComponentPropsWithoutRef<"button"> {
  btnType: BtnTypes
}

const Button = ({ children, className, btnType, ...rest }: Props) => {
  return (
    <button
      className={joinClassNames(btnTypeClasses(btnType), className || "")}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
