export interface UserType {
  id: string;
  email: string;
  name: string;
  birth_day: string;
  phone: string;
  gender: string;
  membership?: boolean;
  staff_type?: string;
  avatar: string;
}

export interface LoginPayload {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  refreshToken: string;
}

export interface LoginResponseQuery {
  userLogin: LoginResponse;
}

export interface ResponseNewToken {
  token: string;
}
