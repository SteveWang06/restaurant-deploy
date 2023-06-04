import React, { Key, useEffect, useState } from "react";
import axiosClient from "../../services/axiosClient";
import { useAppDispatch, useAppSelector } from "../../store";
import { fetchAllOrder } from "../../store/restaurant/order";
import { Button, Layout, Select, Space, Tag, Typography } from "antd";
import { Content } from "antd/es/layout/layout";
const { Title, Text } = Typography;
import { theme } from "antd";
import { FoodOrderType, OrderListType, OrderType } from "../../types/orderType";
import { adminRequester } from "../../services";

const HomePage = (props: any) => {
  const [orderType, setOrderType] = useState([])
  const dispatch = useAppDispatch();
  const { order } = useAppSelector((state) => state.restaurant.order);
  useEffect(() => {
    dispatch(fetchAllOrder(""));
    fetOrderType();
  }, []);

  const fetOrderType = async () => {
    try {
      const res = await adminRequester.getOrderType();
      setOrderType(res.data.data)
    } catch (err) {
      console.log(err)
    }
  };

  const handleChangeStatus = async (value: any) => {
    try {
      console.log(value)
      const data = {
        order_id: value.order_id,
        data: {
          order_status_id: value.order_status_id
        }
      }
      await adminRequester.updateOrder(data);
      await dispatch(fetchAllOrder(""));
    } catch (err) {
      console.log(err)
    }
  }


  return (
    <div>
      <Layout>
        <Content className="my-10 px-5">
          <Typography.Title level={3}>Order List</Typography.Title>
          <Content className="grid grid-cols-12 gap-8">
            {order?.map((ele: OrderListType, index: number) => {
              return (
                <div className="col-span-4 bg-white p-4 relative" key={index}>
                  <div>
                    <div className="absolute top-4 right-2">
                      <Space size={[0, 8]} wrap>
                        {(ele.order_status.role === 1 && (
                          <Tag color="blue">
                            {ele?.order_status.status_type}
                          </Tag>
                        )) ||
                          (ele.order_status.role === 1 && (
                            <Tag color="gold">
                              {ele?.order_status.status_type}
                            </Tag>
                          )) ||
                          (ele.order_status.role === 1 && (
                            <Tag color="green">
                              {ele?.order_status.status_type}
                            </Tag>
                          ))}
                      </Space>
                    </div>
                  </div>
                  <Title level={5} className="text-center text-black">
                    Order {index + 1}
                  </Title>
                  <div>
                    <Title
                      level={4}
                      className="text-black border-b border-solid"
                    >
                      Customer
                    </Title>
                    <div className="flex items-center gap-8">
                      <img
                        className="w-16 h-16 rounded-full"
                        src={ele?.user.avatar}
                        alt=""
                      />
                      <Content>
                        <Title level={4} className="text-black">
                          {ele?.user.name}
                        </Title>
                        <Text className="text-black">{ele?.user.phone}</Text>
                      </Content>
                    </div>
                  </div>
                  <div className="mt-2">
                    <Title
                      level={4}
                      className="text-black border-b border-solid"
                    >
                      Food
                    </Title>
                    {ele.food.map((food: FoodOrderType, index: number) => {
                      return (
                        <div
                          key={index}
                          className="flex items-center gap-8 pb-2"
                        >
                          <img
                            className="w-16 h-16 rounded-full"
                            src={food?.image[0]}
                            alt={food.food_name}
                          />
                          <Content>
                            <Title level={4} className="text-black">
                              {food.food_name}
                            </Title>
                            <div className="flex gap-4">
                              <Text className="text-black">
                                quantity: {food.quatity}
                              </Text>
                              <Text className="text-black">
                                price: $ {food.price}
                              </Text>
                            </div>
                          </Content>
                        </div>
                      );
                    })}
                    <Title
                      level={4}
                      className="text-rose border-t pt-4 mt-4 border-solid border-black flex justify-between"
                    >
                      <span>Total:</span>
                      <span>$ {ele.total_price}</span>
                    </Title>
                    <div>
                      <div className="border-t pt-2 mt-4 border-solid border-black">
                        <Text className="text-black mr-5">Update Status</Text>
                        <Select
                          showSearch={false}
                          style={{ width: 200 }}
                          defaultValue={ele.order_status_id}
                          onChange={(value) => {
                            const data = {
                              order_id: ele.id,
                              data: {
                                order_status_id: value,
                              }
                            }
                            handleChangeStatus(data)
                          }}
                          placeholder="Search to Select"
                          optionFilterProp="children"
                          options={
                            orderType?.map((p: OrderType) => ({
                              value: p.id,
                              label: p.status_type
                            }))}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </Content>
        </Content>
      </Layout>
    </div>
  );
};

export default HomePage;
