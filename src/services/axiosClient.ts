import { errorAlert } from "@/utils/alertUtil";
import axios from "axios";

const axiosClient = axios.create();

axiosClient.interceptors.response.use(
  (response) => {
    return response; // Kembalikan response jika tidak ada masalah
  },
  async (error) => {
    // Tangani error response, misalnya untuk logout jika token kadaluarsa
    if (error.response && error.response.status === 401) {
      // Redirect ke halaman login menggunakan Next.js useRouter
      localStorage.setItem("sessionExpired", "true");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
