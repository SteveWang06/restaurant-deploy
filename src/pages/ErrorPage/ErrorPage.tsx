import { Button, Result } from "antd";
import { ResultStatusType } from "antd/es/result";

export interface ErrorPageProps {
  status: ResultStatusType;
  title: string;
  subTitle: string;
}

const Page: React.FC<ErrorPageProps> = (props) => {
  const { title, subTitle, status } = props;

  return (
    <Result
      status={status}
      title={title}
      subTitle={subTitle}
      extra={<Button type='primary'>Back Home</Button>}
    />
  );
};

export default Page;
