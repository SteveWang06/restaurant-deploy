import clsx from "clsx";
import React from "react";
import "./PlainLayout.style.less";
import withBaseChildLayout from "../withBaseChildLayout";
import { BaseChildLayoutProps } from "../BaseChildLayout";

export interface PlainLayoutProps
  extends React.FC<
    BaseChildLayoutProps & React.HTMLAttributes<HTMLDivElement>
  > {
    child?: any;
  }

const Layout: PlainLayoutProps = (props) => {
  return (
    <div
      {...props}
      className={clsx("plain-layout-content h-full", props.className)}
    />
  );
};

export default withBaseChildLayout(Layout);
