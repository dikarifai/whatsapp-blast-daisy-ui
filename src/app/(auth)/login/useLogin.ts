import { login } from "@/lib/features/authSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { errorAlert } from "@/utils/alertUtil";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const useLogin = () => {
  const dispatch = useAppDispatch();
  const auth = useAppSelector((item) => item.auth);
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
      const data = { username: username, password: password };
      await dispatch(login(data));
      if (pathname === "/login") {
        route.push("/");
      }
      route.push(pathname);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("sessionExpired") === "true") {
      errorAlert("Session has expired. Please login again.");

      localStorage.removeItem("sessionExpired");
    }
  }, []);

  return { username, password, setUsername, setPasword, handleLogin, auth };
};

export default useLogin;
