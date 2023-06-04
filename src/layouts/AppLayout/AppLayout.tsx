import "./AppLayout.style.less";
import { Layout, Menu, Input, Typography, Button } from "antd";
import paths from '../../constants/paths'
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import menus from "../../config/SideMenu";
import Sider from "antd/es/layout/Sider";
import { Content, Header } from "antd/es/layout/layout";
import {
  UserButton,
  NotificationButton,
  QuestionButton,
  MessageButton,
  ApplicationButton,
  SelectRoleBox,
} from "./partials";
import { useAppDispatch, useAppSelector } from "../../store";
import { selectTheme } from "../../store/app/theme";

const { Search } = Input;

export interface AppLayoutProps {
  children?: React.ReactElement;
}

const XLayout: React.FC<AppLayoutProps> = (props) => {
  const { children } = props;
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const { selected } = useAppSelector((state) => state.app.theme);
  const dispatch = useAppDispatch();
  const handleNavigate = ({ key: path }: { key: React.Key }) => {
    navigate(path as string);
  };

  const handleToggle = (value: boolean) => setCollapsed(value);
  const handleChangeTheme = (themeKey: string) =>
    dispatch(selectTheme(themeKey));

  return (
    <Layout className="flex-row h-screen">
      <Sider collapsible collapsed={collapsed} onCollapse={handleToggle}>
        <div className="logo" />
        <SelectRoleBox />
        <Menu
          defaultSelectedKeys={[paths.home]}
          mode="inline"
          onClick={handleNavigate}
          items={menus}
          className="h-full border-none"
        />
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-header">
          {/* Left section */}
          <div className="flex gap-4">
            <Typography.Title level={4}>Origin Restaurant</Typography.Title>
          </div>
          {/* Right section */}
          <div className="flex gap-4 items-center">
            <Button
              icon={
                selected === "dark" ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    stroke="currentColor"
                    className="w-5 h-5 text-white"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                ) : (
                  <svg
                    width="1em"
                    height="1em"
                    fill="#111111"
                    viewBox="0 0 17 17"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    className="nanqu-token-panel-icon"
                    style={{ verticalAlign: "-0.125em" }}
                  >
                    <g
                      stroke="none"
                      strokeWidth={1}
                      fill="#111111"
                      fillRule="evenodd"
                    >
                      <path
                        d="M8,1.33333333 C8.14933333,1.33333333 8.29688889,1.33844444 8.44266667,1.34866666 C8.14755556,1.98422221 8,2.64577777 8,3.33333333 C8,3.96533333 8.12333333,4.56955555 8.37,5.146 C8.61666667,5.72244445 8.94822222,6.21888889 9.36466667,6.63533333 C9.78111112,7.05177777 10.2775556,7.38333332 10.854,7.63 C11.4304444,7.87666668 12.0346667,8.00000001 12.6666667,8 C13.3542222,8 14.0157778,7.85244444 14.6513333,7.55733333 C14.6615556,7.70311111 14.6666667,7.85066667 14.6666667,8 C14.6666667,8.604 14.5868889,9.19422222 14.4273333,9.77066667 C14.2677778,10.3471111 14.0446667,10.8793333 13.758,11.3673333 C13.4713333,11.8553333 13.1233333,12.3042222 12.714,12.714 C12.3046667,13.1237778 11.8557778,13.4717778 11.3673333,13.758 C10.8788889,14.0442222 10.3466667,14.2673333 9.77066667,14.4273333 C9.19466667,14.5873333 8.60444445,14.6671111 8,14.6666685 C7.39555555,14.6662222 6.80533333,14.5864444 6.22933333,14.4273333 C5.65333333,14.2682222 5.1211111,14.0451111 4.63266666,13.758 C4.14422221,13.4708889 3.69533332,13.1228889 3.28599998,12.714 C2.87666665,12.3051111 2.52866665,11.8562222 2.24199998,11.3673333 C1.95533332,10.8784444 1.73222221,10.3462222 1.57266666,9.77066667 C1.4131111,9.19511112 1.33333333,8.6048889 1.33333333,8 C1.33333333,7.3951111 1.4131111,6.80488888 1.57266666,6.22933333 C1.73222221,5.65377778 1.95533332,5.12155555 2.24199998,4.63266666 C2.52866665,4.14377776 2.87666665,3.69488887 3.28599998,3.28599998 C3.69533332,2.8771111 4.14422221,2.5291111 4.63266666,2.24199998 C5.1211111,1.95488887 5.65333333,1.73177776 6.22933333,1.57266666 C6.80533333,1.41355555 7.39555555,1.33377778 8,1.33333333 Z M6.68733333,2.828 C6.11444444,2.97377778 5.58066667,3.20977778 5.086,3.536 C4.59133333,3.86222222 4.166,4.24933333 3.81,4.69733333 C3.454,5.14533333 3.17444444,5.65488889 2.97133333,6.226 C2.76822221,6.79711111 2.66666666,7.38822222 2.66666666,7.99933333 C2.66666666,8.72155555 2.80733332,9.41155555 3.08866666,10.0693333 C3.36999999,10.7271111 3.74933332,11.2948889 4.22666666,11.7726667 C4.70399999,12.2504444 5.27177777,12.6297778 5.92999998,12.9106667 C6.5882222,13.1915556 7.2782222,13.3322222 7.99999998,13.3326667 C8.6111111,13.3326667 9.20222221,13.2311111 9.77333331,13.028 C10.3444444,12.8248889 10.854,12.5453333 11.302,12.1893333 C11.75,11.8333333 12.1371111,11.408 12.4633333,10.9133333 C12.7895555,10.4186666 13.0255555,9.88488887 13.1713333,9.31199998 C13.022,9.32577777 12.8535555,9.33266666 12.666,9.33266666 C11.8535555,9.33266666 11.0775555,9.17377777 10.338,8.85599998 C9.59844443,8.5382222 8.96044443,8.11111109 8.42399998,7.57466666 C7.88755554,7.03822222 7.46044443,6.40022222 7.14266666,5.66066666 C6.82488889,4.92111109 6.66599999,4.14511109 6.66599998,3.33266666 C6.66599998,3.1451111 6.67288888,2.97666666 6.68666666,2.82733333 L6.68733333,2.828 Z"
                        id="Dark-形状"
                      />
                    </g>
                  </svg>
                )
              }
              onClick={() =>
                handleChangeTheme(selected === "dark" ? "default" : "dark")
              }
              shape="circle"
            />
            <UserButton />
          </div>
        </Header>
        <Content className="flex flex-col" style={{ margin: "0 16px" }}>
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default XLayout;
