import axiosInstance from "@/services/axiosInstance";
import { errorUtil } from "@/utils/errorUtil";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const data = await request.formData();
  console.log("Blast Data: ", data);

  try {
    const response = await axiosInstance.post("/blast/blast-message", data);

    return NextResponse.json(response.data);
  } catch (error) {
    return errorUtil(error);
  }
}
