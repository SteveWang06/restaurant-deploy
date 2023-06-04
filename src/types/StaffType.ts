export interface StaffTypeId {
  id: string;
  type_name: string;
}
export interface StaffType {
  id: string;
  email: string;
  name: string;
  avatar: string;
  phone: string;
  address: string;
  birth_day: string;
  gender: "male" | "fremale";
  staff_type: StaffTypeId;
}

export interface WorkShiftType {
  id: string;
  shift_name: string;
  time_work: number;
  start_time: string;
  end_time: string;
}

