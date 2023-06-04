import React, { useState, useEffect } from "react";
import {
  Button,
  Cascader,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Switch,
  TreeSelect,
} from "antd";
import { Typography } from "antd";
import { useAppSelector } from "../../../store";
const { Title } = Typography;
type SizeType = Parameters<typeof Form>[0]["size"];
import type { SelectProps, DatePickerProps } from "antd";
import { WorkShiftType } from "../../../types/orderType";
import staffRequester from "../../../services/requester/staffRequester";
import { Moment } from 'moment';
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const CreateCalendar: React.FC = () => {
  const [componentSize, setComponentSize] = useState<SizeType | "default">(
    "default"
  );
  const [addStaff, setAddStaff] = useState<
    { is_work: boolean; staff_id: string }[]
  >([]);
  const [dateWork, setDateWork] = useState<string | null>(null)
  const [workShitftId, setWorkShitftId] = useState<string | null>(null)
  const { staffList } = useAppSelector((state) => state.restaurant.staff);
  const options: SelectProps["options"] = [];
  const [workShift, setWorkShift] = useState<WorkShiftType[]>([]);
    const navigate = useNavigate();
  const getWorkShift = async () => {
    try {
      const res = await staffRequester.getAllWorkShift();
      setWorkShift(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getWorkShift();
  }, []);

  if (staffList) {
    for (let i = 0; i < staffList.length; i++) {
      options.push({
        label: staffList[i].name,
        value: staffList[i].id,
      });
    }
  }

  const handleChange = (value: string[]) => {
    const data = value.map((ele) => ({
      is_work: false,
      staff_id: ele,
    }));
    setAddStaff(data);
  };

  const onFormLayoutChange = ({ size }: { size: SizeType }) => {
    setComponentSize(size);
  };

  const handleFinish = async () => {
    try {
      const data = {
        date_work: dateWork,
        work_shift_id: workShitftId,
        staff: addStaff, 
    };

     await staffRequester.createCalendar(data);
     Swal.fire({
      position: "center",
      icon: "success",
      text: "create calendar work success !",
      showConfirmButton: false,
      timer: 1000,
    });
      navigate('/admin/calendarWork');
    } catch (err) {
      Swal.fire({
        position: "center",
        icon: "error",
        text: "create calendar work fail !",
        showConfirmButton: false,
        timer: 1000,
      });
      console.log(err);
    }
  };

  const handleSlectWorkShift = (value: string) => setWorkShitftId(value)

  const handleDateChange: DatePickerProps['onChange'] = (date, dateString) => {
    if (date) {
      const formattedDate = date.format('MM/DD/YYYY');
        setDateWork(formattedDate)
    }
  };
  

  return (
    <div>
      <Title className="text-2xl mb-5">Create Calendar Work</Title>
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        initialValues={{ size: componentSize }}
        onFinish={() => handleFinish()}
        onValuesChange={onFormLayoutChange}
        size={componentSize as SizeType}
        style={{ maxWidth: 600 }}
      >
        <Form.Item label="Form Size" name="size">
          <Radio.Group>
            <Radio.Button value="small">Small</Radio.Button>
            <Radio.Button value="default">Default</Radio.Button>
            <Radio.Button value="large">Large</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="add staff">
          <Select
            mode="multiple"
            allowClear
            style={{ width: "100%" }}
            placeholder="Please select"
            onChange={handleChange}
            options={options}
          />
        </Form.Item>
        <Form.Item label="work shift">
          <Select
            showSearch
            style={{ width: 200 }}
            placeholder="Search to Select"
            optionFilterProp="children"
            filterOption={(input, option) =>
              (option?.label ?? "").includes(input)
            }
            onChange={handleSlectWorkShift}
            filterSort={(optionA, optionB) =>
              (optionA?.label ?? "")
                .toLowerCase()
                .localeCompare((optionB?.label ?? "").toLowerCase())
            }
            options={workShift.map((ele: WorkShiftType) => ({
              label: ele.shift_name,
              value: ele.id,
            }))}
          />
        </Form.Item>
        
        <Form.Item label="Date Work">
        <DatePicker onChange={handleDateChange} />
        </Form.Item>
        <Form.Item label="Button">
          <Button htmlType="submit" >Button</Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateCalendar;
