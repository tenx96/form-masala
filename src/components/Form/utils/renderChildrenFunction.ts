import React, { ReactNode } from "react";

const renderChildrenFunction = <T = any>(
  childrenFn: ((args: T) => React.ReactNode) | ReactNode,
  args: T
) => {
  if (typeof childrenFn === "function") {
    return childrenFn(args);
  } else {
    return childrenFn;
  }
};

export default renderChildrenFunction;
