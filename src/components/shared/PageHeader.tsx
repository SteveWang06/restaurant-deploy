import { PageHeaderProps, PageHeader } from "@ant-design/pro-components";
import { Typography, theme } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";

const { Text, Title } = Typography;
const { useToken } = theme;

function XPageHeader(props: PageHeaderProps) {
  const { token } = useToken();

  return (
    <PageHeader
      {...props}
      title={
        <Title level={4} className="mb-0">
          {props.title}
        </Title>
      }
      subTitle={<Text type="secondary">{props.subTitle}</Text>}
      backIcon={<ArrowLeftOutlined color={"#fff"} />}
    />
  );
}

export default XPageHeader;
