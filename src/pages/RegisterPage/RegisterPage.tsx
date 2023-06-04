import { ArrowLeftOutlined, LockOutlined, UserOutlined } from "@ant-design/icons";
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
  Select,
  TreeSelect,
} from "antd";
import {
  GithubOutlined,
  TwitterOutlined,
  FacebookOutlined,
  LoginOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store";
import { LoginPayload } from "../../types/AuthType";
import Swal from "sweetalert2";
import React, { useState } from "react";
import userRequester from "../../services/requester/userRequester";

const { Content } = Layout;
const { Text, Title, Link } = Typography;

function DefaultLoginForm() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [gender, setGender] = useState<string>();

  const onChange = (newValue: string) => {
    setGender(newValue);
  };

  const handleFinish = async (value: LoginPayload) => {
    try {
      const data = { ...value, gender };
      await userRequester.userRegister(data);

      Swal.fire({
        position: "center",
        icon: "success",
        title: "Resgister success",
        showConfirmButton: false,
        timer: 1000,
      });

      navigate('/login')
    } catch (err) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Register fail!",
        showConfirmButton: false,
        timer: 1000,
      });
    }
  };

  return (
    <Form
      name="normal_login"
      className="login-form"
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

      <Form.Item
        name="name"
        rules={[
          {
            required: true,
            message: "Please input your Name!",
          },
        ]}
      >
        <Input type="text" placeholder="name" />
      </Form.Item>

      <Form.Item
        name="birth_day"
        rules={[
          {
            required: true,
            message: "Please input your birth day!",
          },
        ]}
      >
        <Input type="text" placeholder="birth day" />
      </Form.Item>

      <Form.Item>
        <TreeSelect
          style={{ width: "100%" }}
          value={gender}
          treeData={[
            { title: "male", value: "male" },
            { title: "fremale", value: "fremale" },
          ]}
          dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
          placeholder="Please select gender"
          treeDefaultExpandAll
          onChange={onChange}
        />
      </Form.Item>

      <Form.Item>
        <Button htmlType="submit" className="login-form-butto w-full">
          Register
        </Button>
      </Form.Item>
    </Form>
  );
}

export interface LoginPageProps {
  child?: any;
}

const RegisterPage: React.FC<LoginPageProps> = (props) => {
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

export default RegisterPage;
