import axios from "axios";
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getVerificationCode = async (
  phonenumber: string,
  email: string
) => {
  const response = await axios.post(`/api/auth/send-otp`, { email });
  return response.data;
};

export const SignUp = async (
  email: string,
  phonenumber: string,
  password: string,
  verificationCode: string,
  referBy: string,
  captchaId?: string
) => {
  const payload: Record<string, string> = {
    password,
    referralCode: referBy,
  };

  if (email) {
    payload.email = email;
    payload.verificationCode = verificationCode;
  }

  if (phonenumber) {
    payload.phoneNumber = phonenumber;
    payload.captcha = verificationCode;
    if (captchaId) payload.captchaId = captchaId;
  }

  const response = await axios.post(`/api/auth/register`, payload);
  return response.data;
};

export const login = async (
  email: string,
  phonenumber: string,
  password: string
) => {
  const payload: Record<string, string> = {
    email,
    password,
  };

  if (phonenumber) {
    payload.phoneNumber = phonenumber;
  }

  const response = await axios.post(`/api/auth/login`, payload);
  return response;
};

export const forgotPassword = async (email: string) => {
  const response = await axios.post(`/api/auth/reset-password`, { email });
  return response;
};

export const resetPassword = async (_email: string, password: string, otp: string) => {
  const response = await axios.post(`/api/auth/reset-password/confirm`, {
    token: otp,
    password,
  });
  return response;
};