import axiosInstance from "@/services/axiosInstance";
import { errorUtil } from "@/utils/errorUtil";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { search } = new URL(request.url);

  const url = `/accounts${search}`;

  try {
    const response = await axiosInstance.get(url);

    return NextResponse.json(response.data);
  } catch (error) {
    return errorUtil(error);
  }
}
export async function POST(request: Request) {
  try {
    const data = await request.json();
    const response = await axiosInstance.post("/accounts", data);

    return NextResponse.json(response.data);
  } catch (error) {
    return errorUtil(error);
  }
}
