import axiosInstance from "@/services/axiosInstance";
import { errorUtil } from "@/utils/errorUtil";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const data = await request.formData();

  try {
    const response = await axiosInstance.post("/blast/send-message", data);

    return NextResponse.json(response.data, { status: response.status });
  } catch (error) {
    return errorUtil(error);
  }
}
