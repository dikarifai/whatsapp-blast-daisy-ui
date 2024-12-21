import { errorAlert } from "@/utils/alertUtil";
import axios from "axios";
import Cookies from "js-cookie";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
const axiosClient = axios.create({
  baseURL: baseUrl,
});

axiosClient.interceptors.request.use(
  async (config) => {
    const token = Cookies.get("token");

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

axiosClient.interceptors.response.use(
  (response) => {
    return response; // Kembalikan response jika tidak ada masalah
  },
  async (error) => {
    // Tangani error response, misalnya untuk logout jika token kadaluarsa
    if (error.response && error.response.status === 401) {
      // Redirect ke halaman login menggunakan Next.js useRouter
      localStorage.setItem("sessionExpired", "true");
      Cookies.remove("token");
      // window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
