"use client";

import CardComponent from "@/components/CardComponent";
import { getDashbord } from "@/lib/features/dashboardSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useEffect } from "react";
import { FaUser, FaWhatsapp } from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";

export default function Home() {
  const dispatch = useAppDispatch();
  const dashboard = useAppSelector((state) => state.dashboard);

  useEffect(() => {
    dispatch(getDashbord());
  }, []);

  return (
    <main className="pt-4 grid-cols-2 grid xl:grid-cols-3 place-items-center gap-y-6">
      <CardComponent icon={FaWhatsapp} count={dashboard.data.account} />
      <CardComponent icon={FaMessage} count={dashboard.data.messageLog} />
      <CardComponent icon={FaUser} count={dashboard.data.user} />
    </main>
  );
}
