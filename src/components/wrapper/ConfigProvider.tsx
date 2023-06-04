import { ConfigProvider } from "antd";
import { useAppSelector } from "../../store";
import  themes  from "../../config/theme";
import { useMemo } from "react";
import { Global } from "@emotion/react";

export interface XConfigProviderProps {
  children?: React.ReactNode;
}

const XConfigProvider = (props: XConfigProviderProps) => {
  const {
    selected: selectedThemeKey,
    colorPrimary,
    ...restConfigProps
  } = useAppSelector((state) => state.app.theme);

  const selectedTheme = useMemo(
    () => ({
      ...themes[selectedThemeKey],
      token: {
        ...themes[selectedThemeKey]?.token,
        colorPrimary,
      },
    }),
    [selectedThemeKey, colorPrimary],
  );

  return (
    <>
      <Global
        styles={{
          ".ant-layout-sider-trigger": {
            backgroundColor:
              selectedTheme && selectedTheme.components?.Layout?.colorBgTrigger,
          },
        }}
      />
      <ConfigProvider {...restConfigProps} theme={selectedTheme}>
        {props.children}
      </ConfigProvider>
    </>
  );
};

export default XConfigProvider;
