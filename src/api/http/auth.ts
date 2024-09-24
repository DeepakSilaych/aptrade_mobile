import axios from "axios";
import querystring from 'querystring';

import { httpApiUrl } from "../constants";


interface ILoginResponse {
  status: 'success' | 'error';
  message: string;
  OTP?: string;
}
export const login = async (phone: number) => {
  try {
    const res = await axios.post(
      `${httpApiUrl}/accounts/login/`,
      querystring.stringify({ phone })
    );
    const resp: ILoginResponse = res.data;
    return resp;
  } catch (e) {
    console.log(e);
    return null;
  }
};

interface IVerifyOtp {
  status: 'success' | 'error';
  message: string;
  user_data?: {
    token: string;
    username: string;
    phone: string;
    avatar: null;
  };
}

export const verifyOtp = async (phone: number, otp: number) => {
  try {
    const res = await axios.post(
      `${httpApiUrl}/accounts/verify-otp/`,
      querystring.stringify({ phone, otp })
    );
    const resp: IVerifyOtp = res.data;
    return resp;
  } catch (e) {
    console.log(e);
    return null;
  }
};