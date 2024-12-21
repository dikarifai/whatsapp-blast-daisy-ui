"use client";

import { getProfile } from "@/lib/features/headerSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import axiosClient from "@/services/axiosClient";
import { useEffect } from "react";

const HeaderComponent: React.FC = () => {
  const dispatch = useAppDispatch();
  const header = useAppSelector((state) => state.header);
  const name = header.data.profile.name;
  const title = header.data.title;

  useEffect(() => {
    dispatch(getProfile());
  }, []);

  return (
    <div className="flex flex-col border-b-2 border-slate-400 p-5 text-4xl gap-4">
      <h2 className="text-2xl w-full flex flex-row gap-2 items-center">
        Welcome{" "}
        {header.isLoading ? (
          <div className="skeleton h-6 w-40"></div>
        ) : (
          <span className="text-cyan-500">{name}</span>
        )}
      </h2>
      <div className="flex flex-col">
        {title ? (
          <div>{title}</div>
        ) : (
          <div className="skeleton h-10 w-40"></div>
        )}
      </div>
    </div>
  );
};

export default HeaderComponent;
