import { theme } from "antd";
import { ThemeConfig } from "antd/es/config-provider/context";

const { defaultAlgorithm } = theme;

const instance: ThemeConfig = {
  algorithm: [defaultAlgorithm],
  token: {},
  components: {
    Layout: {
      colorBgHeader: "#ffffff",
      colorBgTrigger: "#cdcdcd",
    },
  },
};

export default instance;
