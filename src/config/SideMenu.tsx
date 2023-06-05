import { MenuProps } from "antd";
import {
  PieChartOutlined,
  ProjectOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import  paths  from "../constants/paths";

export type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem("Order", paths.home, <ProjectOutlined />),
  getItem("Calendar Work", paths.calendarWork, <ProjectOutlined />),
  getItem("FoodManament", paths.foodManament, <ProjectOutlined />),
  // getItem("Properties", "properties", <PieChartOutlined />, [
  //   getItem("Attributes", paths.attributes, <CalendarOutlined />),
  //   getItem("Services", "services", <CalendarOutlined />, [
  //     getItem("Type", paths.serviceType),
  //     getItem("List", paths.serviceList),
  //   ]),
  //   getItem("Payments", paths.payments, <CalendarOutlined />),
  // ]),
  // getItem("Users", paths.users, <CalendarOutlined />),
];

export default items;
