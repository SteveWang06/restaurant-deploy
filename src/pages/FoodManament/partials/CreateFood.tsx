import { UploadOutlined } from "@ant-design/icons";
import { Button, Form, Input, InputNumber, Upload } from "antd";
import React, { useState } from "react";
import { FoodCreateType } from "../../../types/FoodType";
import { foodRequester } from "../../../services";

const { TextArea } = Input;

const CreateFood: React.FC = () => {
  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const handleFinish = async (value: FoodCreateType): Promise<void> => {
    const formData = new FormData();
    const validKeys: Array<keyof FoodCreateType> = ["food_name", "price", "description"];
  
    for (const key in value) {
      if (validKeys.includes(key as keyof FoodCreateType)) {
        formData.append(key, value[key]);
      } else if (key === "image") {
        const images = Array.isArray(value.image) ? value.image.slice(0, 4) : [value.image];
        images.forEach((image: File, index: number) => {
          formData.append(`image=@`, image);
        });
      }
    }
  
    try {
      const res = await foodRequester.createFood(formData);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        style={{ maxWidth: 600 }}
        onFinish={(e: FoodCreateType) => handleFinish(e)}
      >
        <Form.Item
          name="food_name"
          rules={[
            {
              required: true,
              message: "Please input your Food Name!",
            },
          ]}
          label="Food Name"
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="price"
          rules={[
            {
              required: true,
              message: "Please input your price!",
            },
          ]}
          label="Price"
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          name="description"
          rules={[
            {
              required: true,
              message: "Please input your description!",
            },
          ]}
          label="description"
        >
          <TextArea rows={4} />
        </Form.Item>
        <Form.Item
          label="Upload"
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          <Form.Item
            name="image"
            label="Upload"
            valuePropName="fileList"
            getValueFromEvent={normFile}
            extra="image"
          >
            <Upload name="image" action="/upload.do" listType="picture">
              <Button icon={<UploadOutlined />}>Click to upload</Button>
            </Upload>
          </Form.Item>
        </Form.Item>
        <Form.Item label="Button">
          <Button htmlType="submit">Button</Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default () => <CreateFood />;
