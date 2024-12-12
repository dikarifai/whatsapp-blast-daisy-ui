import axios from "axios";
import { cookies } from "next/headers";

import { NextResponse } from "next/server";

const baseUrl = process.env.API_URL;

const axiosInstance = axios.create({
  baseURL: baseUrl,
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const cookie = await cookies();
    const token = cookie.get("token")?.value;

    if (token) {
      {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response; // Kembalikan response jika tidak ada masalah
  },
  async (error) => {
    // Tangani error response, misalnya untuk logout jika token kadaluarsa

    return Promise.reject(error);
  }
);

export default axiosInstance;
