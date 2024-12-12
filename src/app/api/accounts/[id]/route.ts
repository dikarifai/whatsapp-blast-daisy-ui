import axiosInstance from "@/services/axiosInstance";
import { errorUtil } from "@/utils/errorUtil";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

export async function DELETE(
  request: NextApiRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;

    const response = await axiosInstance.delete(`accounts/${id}`);

    return NextResponse.json(response.data);
  } catch (error) {
    return errorUtil(error);
  }
}
