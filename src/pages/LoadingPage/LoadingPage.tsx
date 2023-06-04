import { Spin, Layout } from "antd";

const { Content } = Layout;

export interface LoadingPageProps {
    children?: any;
}

const Page: React.FC<LoadingPageProps> = () => {
  return (
    <Layout className='flex w-full h-full items-center justify-center'>
      <Content className='flex items-center justify-center'>
        <Spin />
      </Content>
    </Layout>
  );
};

export default Page;
