import React from "react";

const Button: React.FC<{ children: React.ReactNode }> = (props) => {
  return <button>{props.children}</button>;
};

export default Button;
