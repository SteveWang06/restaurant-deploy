import { ThemeConfig } from "antd/es/config-provider/context";
import { base, dark } from "./colection";

export interface ThemeProps {
  [themeKey: string]: ThemeConfig;
}

const Instance: ThemeProps = {
  default: base,
  dark,
};

export default Instance;
