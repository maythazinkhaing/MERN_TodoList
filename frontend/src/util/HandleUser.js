import { toast } from "react-toastify";

import axios from "./axios";

const REG_URL = "/user/register";
const LOG_URL = "user/login";

export const savedUser = JSON.parse(localStorage.getItem("user"));

export const HandleRegister = async (userData, setAuth) => {
  try {
    const response = await axios.post(REG_URL, userData);

    if (response.data) {
      localStorage.setItem("user", JSON.stringify(response.data));
      setAuth((data) => {
        return {
          ...data,
          user: response.data,
          isSuccess: true,
        };
      });
    }
    console.log(setAuth.isSuccess);
    return response.data;
  } catch (error) {
    console.log(error.response.data.message);
    toast(error.response.data.message);
  }
};

export const HandleLogin = async (userData, setAuth) => {
  try {
    const response = await axios.post(LOG_URL, userData);

    if (response.data) {
      localStorage.setItem("user", JSON.stringify(response.data));
      setAuth((data) => {
        return {
          ...data,
          user: response.data,
          isSuccess: true,
        };
      });
    }
    console.log(setAuth.isSuccess);
    return response.data;
  } catch (error) {
    console.log(error.response.data.message);
    toast(error.response.data.message);
  }
};

export const handleLogOut = () => {
  localStorage.removeItem("user");
};
