
import React from "react";
import { Button, Table } from "antd";
import type { ColumnsType, TableProps } from "antd/es/table";
import { useAppDispatch, useAppSelector } from "../../store";
import clsx from "clsx";
import { DeleteOutlined, FormOutlined, PlusOutlined } from "@ant-design/icons";
import { Typography } from "antd";
import { useNavigate } from "react-router-dom";
import paths from "../../constants/paths";
import Swal from "sweetalert2";
import { FoodType } from "../../types/FoodType";
import { foodRequester } from "../../services";
import { fetchAllFood } from "../../store/restaurant/food";
const { Title, Text } = Typography;

interface DataType {
  key: React.Key;
  name: string;
  description: string;
  price: number;
  image: {
    id: string;
    image: string;
  }[];
  action: FoodType,
}

const FoodManament = () => {
  const { food } = useAppSelector(
    (state) => state.restaurant.food
  );

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleDeleteFood = async (id: string) => {
    try {
      await foodRequester.deleteFood(id);
      Swal.fire({
        position: "center",
        icon: "success",
        text: "Delete calendar work success !",
        showConfirmButton: false,
        timer: 1000,
      });
      await dispatch(fetchAllFood(''));
    } catch (err) {
      Swal.fire({
        position: "center",
        icon: "error",
        text: "Delete calendar work fail !",
        showConfirmButton: false,
        timer: 1000,
      });
      console.log(err);
    }
  };


  const columns: ColumnsType<DataType> = [
    {
      title: "Food Name",
      dataIndex: "name",
      render: (text, rec, index) => <Title level={5}>{text}</Title>,
      sorter: (a, b) => a.name.length - b.name.length,
      width: "20%",
    },
    {
      title: "Image",
      dataIndex: "image",
      render: (text, record, index) => {
        return text?.slice(0,1).map((p: any, idx: number) => {
          return (
            <div
              key={idx}
              className={clsx("w-32 h-32 overflow-hidden")}
            >
              <img className="w-full h-full object-cover" src={p.image} alt={p.id} />
            </div>
          );
        });
      },
      width: "25%",
    },
    {
        title: "Description",
        dataIndex: "description",
        render: (text, rec, idx) => <Text className="line-clamp-4" >{text}</Text>
        ,
        width: "25%",
      },
    {
      title: "Price",
      dataIndex: "price",
      render: (text, rec, idx) => <Title level={5} className="text-rose">$ {text}</Title>
      ,
      width: "20%",
    },
    
    {
      title: "Action",
      dataIndex: "action",
      render: (text, rec, idx) => (
        <div>
          <span 
          onClick={() => navigate(`/admin/updateCalendar/${text.id}`)}
          className="mr-3">
            <FormOutlined className="text-green text-[20px] cursor-pointer" />
          </span>
          <span onClick={() => handleDeleteFood(text.id)}>
            <DeleteOutlined 
            className="text-rose text-[20px] cursor-pointer" />
          </span>
        </div>
      ),
      width: "20%",
    },
  ];

  const data = food?.map((ele: FoodType) => ({
    key: ele.id,
    name: ele.food_name,
    description: ele?.description,
    price: ele?.price,
    image: ele.image,
    action: ele
  }));

  const onChange: TableProps<DataType>["onChange"] = (
    pagination,
    filters,
    sorter,
    extra
  ) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  return (
    <div>
      <div className="mb-10 flex justify-between items-center">
        <Title level={4}>Food Manament</Title>
        <Button
          onClick={() => navigate(`/admin/${paths.createFood}`)}
          className="flex items-center"
        >
          <PlusOutlined /> Create Food
        </Button>
      </div>
      <Table columns={columns} dataSource={data} onChange={onChange} />
    </div>
  );
};

export default FoodManament;
