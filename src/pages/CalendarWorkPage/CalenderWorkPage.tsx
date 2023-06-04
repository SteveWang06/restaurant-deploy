import React, { useEffect } from "react";
import { Button, Table } from "antd";
import type { ColumnsType, TableProps } from "antd/es/table";
import { useAppDispatch, useAppSelector } from "../../store";
import moment from "moment";
import {
  CalendarWorkListType,
  StaffType,
  WorkShiftType,
} from "../../types/orderType";
import styles from "./CalenderWord.module.less";
import clsx from "clsx";
import { DeleteOutlined, FormOutlined, PlusOutlined } from "@ant-design/icons";
import { Typography } from "antd";
import { useNavigate } from "react-router-dom";
import paths from "../../constants/paths";
import staffRequester from "../../services/requester/staffRequester";
import Swal from "sweetalert2";
import { fetchAllCalendarWork } from "../../store/restaurant/calendarWork";
const { Title, Text } = Typography;

interface DataType {
  key: React.Key;
  date: string;
  staff: StaffType[];
  shift: WorkShiftType;
  action: CalendarWorkListType;
}

const CalenderWorkPage: React.FC = () => {
  const { calendarWorkList } = useAppSelector(
    (state) => state.restaurant.calendarWork
  );
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleDeleteCalendar = async (id: string) => {
    try {
      await staffRequester.deleteCalender(id);
      Swal.fire({
        position: "center",
        icon: "success",
        text: "Delete calendar work success !",
        showConfirmButton: false,
        timer: 1000,
      });
      await dispatch(fetchAllCalendarWork());
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
      title: "Date",
      dataIndex: "date",
      sorter: (a, b) => a.date.length - b.date.length,
      width: "25%",
    },
    {
      title: "staff",
      dataIndex: "staff",
      render: (text, record, index) => {
        return text?.map((p: any, idx: number) => {
          return (
            <div
              key={idx}
              className={clsx("relative inline-block mx-1", styles.staffName)}
            >
              <span className="cursor-pointer w-10 h-10 text-2xl uppercase rounded-full bg-blueSee text-white font-medium flex items-center justify-center border border-solid border-starYellow">
                {p.name.slice(0, 1)}
              </span>
              <div
                className={clsx(
                  "p-5 shadow-lg bg-white text-black absolute top-[130%] left-0 capitalize border border-solid border-lineGray",
                  styles.staffProfile
                )}
              >
                <p>{p?.name}</p>
                <p>{p?.email}</p>
                <p>{p?.phone}</p>
                <p>{p?.adderss}</p>
              </div>
            </div>
          );
        });
      },
      width: "40%",
    },
    {
      title: "Shift",
      dataIndex: "shift",
      render: (text, rec, idx) => (
        <div key={idx}>
          <Title level={5} >{text?.shift_name}</Title>
          <div className="flex flex-col">
            <Text>start time: {text.start_time}</Text>
            <Text>end time: {text.end_time}</Text>
          </div>
        </div>
      ),
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
          <span onClick={() => handleDeleteCalendar(text.id)}>
            <DeleteOutlined className="text-rose text-[20px] cursor-pointer" />
          </span>
        </div>
      ),
      width: "20%",
    },
  ];

  const data = calendarWorkList?.map((ele: CalendarWorkListType) => ({
    key: ele.id,
    date: moment(ele.date_work).format("MM/DD/YYYY"),
    staff: ele?.staff,
    shift: ele.work_shift,
    action: ele,
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
        <Title level={4}>Calendar Work</Title>
        <Button
          onClick={() => navigate(`/admin/${paths.createCalendar}`)}
          className="flex items-center"
        >
          <PlusOutlined /> Create Calendar
        </Button>
      </div>
      <Table columns={columns} dataSource={data} onChange={onChange} />
    </div>
  );
};

export default CalenderWorkPage;
