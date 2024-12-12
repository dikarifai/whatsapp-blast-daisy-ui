import axiosInstance from "@/services/axiosInstance";
import axios from "axios";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

const useLogin = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPasword] = useState<string>("");
  const pathname = usePathname();
  const route = useRouter();

  function setCookie(name: string, value: string, days: number) {
    let expires = "";
    if (days) {
      const date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = `; expires=${date.toUTCString()}`;
    }
    document.cookie = `${name}=${
      value || ""
    }${expires}; path=/; Secure; SameSite=Strict`;
  }

  const handleLogin = async () => {
    try {
      const data = {
        username: username,
        password: password,
      };
      const response = await axios.post(`/api/auth/login`, data);
      setCookie("token", response.data.token, 7);
      if (pathname === "/login") {
        route.push("/");
      }
      route.push(pathname);
      console.log("resp: ", response);
    } catch (error) {
      console.log("Ini Error");

      console.log("error", error);
    }
  };

  return { username, password, setUsername, setPasword, handleLogin };
};

export default useLogin;