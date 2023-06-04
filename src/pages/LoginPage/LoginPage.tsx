import {
  ArrowLeftOutlined,
  LockOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  Layout,
  Typography,
  Input,
  Button,
  Form,
  Tabs,
  Space,
  Checkbox,
  Divider,
  message,
} from "antd";
import {
  GithubOutlined,
  TwitterOutlined,
  FacebookOutlined,
  LoginOutlined,
} from "@ant-design/icons";
import { Navigate, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store";
import { userLogin } from "../../store/restaurant/auth";
import { LoginPayload } from "../../types/AuthType";
import Swal from "sweetalert2";
import userRequester from "../../services/requester/userRequester";

const { Content } = Layout;
const { Text, Title, Link } = Typography;

function DefaultLoginForm() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const propfile = useAppSelector((state) => state.restaurant.auth.profile);

  const handleFinish = async (value: LoginPayload) => {
    try {
      const res = await userRequester.userLogin(value);
      await localStorage.setItem("access_token", res.data.data.token);
      await localStorage.setItem("refresh_token", res.data.data.refreshToken);
      await localStorage.setItem("expired", res.data.data.expired);
      await dispatch(userLogin());
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Login success",
        showConfirmButton: false,
        timer: 1000,
      });

      if (propfile.user_type) {
        if (propfile.user_type === "admin") {
          navigate("/admin");
        } else {
          navigate("/staff");
        }
      } else {
        navigate("/food");
      }
    } catch (error) {
      Swal.fire({
        position: "center",
        icon: "error",
        text: "Email or password not correct !",
        showConfirmButton: false,
        timer: 1000,
      });
    }
  };

  return (
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{ remember: true, email: "admin", password: "admin" }}
      onFinish={(e: LoginPayload) => handleFinish(e)}
    >
      <Form.Item
        name="email"
        rules={[
          {
            required: true,
            message: "Please input your Email!",
          },
        ]}
      >
        <Input
          type="email"
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Email"
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: "Please input your Password!",
          },
        ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Link className="login-form-forgot" href="">
          Forgot password
        </Link>
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit" className="login-form-butto w-full">
          Log in
        </Button>
      </Form.Item>
    </Form>
  );
}

export interface LoginPageProps {
  child?: any;
}

const Page: React.FC<LoginPageProps> = (props) => {
  const navigate = useNavigate();
  return (
    <Layout className="flex items-center h-screen w-full justify-center">
      <Content className="flex items-center border border-solid border-lineGray px-10">
        <div 
        onClick={() => navigate('/food')}
        className="absolute top-10 left-10 ">
          <ArrowLeftOutlined className="text-2xl hover:text-rose cursor-pointer" />
        </div>
        <Space direction="vertical">
          <Title level={2} className="text-center">
            ORIGIN Restaurant
          </Title>
          <Divider className="my-0">
            <Text type="secondary" className="text-center">
              The world's largest event tracking platform
            </Text>
          </Divider>
          <DefaultLoginForm />
          <Divider className="my-0">
            <Text type="secondary" className="text-center">
              Our contacts
            </Text>
          </Divider>
          <div className="flex flex-row items-center gap-4 justify-center">
            <Button shape="circle" icon={<GithubOutlined />} />
            <Button shape="circle" icon={<TwitterOutlined />} />
            <Button shape="circle" icon={<FacebookOutlined />} />
          </div>
        </Space>
      </Content>
    </Layout>
  );
};

export default Page;
