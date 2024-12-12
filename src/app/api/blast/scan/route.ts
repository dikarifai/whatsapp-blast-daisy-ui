import axiosInstance from "@/services/axiosInstance";
import { errorUtil } from "@/utils/errorUtil";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { number } = await request.json();
  try {
    const response = await axiosInstance.post("/blast/scan", {
      number: number,
    });

    return NextResponse.json(response.data);
  } catch (error) {
    return errorUtil(error);
  }
}
