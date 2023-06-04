export interface FoodOrderType {
  id: string;
  quatity: number;
  food_name: string;
  description: string;
  price: number;
  image: string[];
}

export interface OrderType {
  id: string;
  status_type: string;
  role: number;
}

export interface OrderListType {
  id: string;
  total_price: number;
  order_status_id: string;
  user_id: string;
  user: {
    email: string;
    name: string;
    phone: string;
    avatar: string;
  };
  order_status: OrderType;
  food: FoodOrderType[];
}

export interface WorkShiftType {
  id: string;
  shift_name: string;
  time_work: number;
  start_time: string;
  end_time: string;
}

export interface StaffType {
    id: string;
    is_work: boolean;
    email: string;
    name: string;
    avatar: string;
    phone: string;
    adderss: string;
    birth_day: string;
    gender: string;
    staff_type: string;
    staff_id: string;
  }
export interface CalendarWorkListType {
  id: string;
  work_shift_id: string;
  createAt: any;
  updateAt: any;
  date_work: any;
  work_shift: WorkShiftType;
  staff: StaffType[];
}
