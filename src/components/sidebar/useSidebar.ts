import { setTitle } from "@/lib/features/headerSlice";
import { useAppDispatch } from "@/lib/hooks";
import { usePathname } from "next/navigation";
import { useState } from "react";

const useSidebar = () => {
  const sidebarItems = [
    { id: 1, name: "Dashboard", key: "dashboard", path: "/" },
    { id: 2, name: "Account", key: "account", path: "/account" },
    { id: 2, name: "Send Message", key: "send-message", path: "/send-message" },
    { id: 3, name: "User", key: "user", path: "/user" },
  ];
  const dispatch = useAppDispatch();

  const handleClickNav = (name: string) => {
    dispatch(setTitle(name));
  };

  return {
    sidebarItems,
    handleClickNav,
  };
};

export default useSidebar;
