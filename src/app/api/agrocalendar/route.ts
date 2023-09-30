import { NextResponse } from "next/server";
import { prisma } from "@/prisma";

export async function GET() {
  const content: any = [];
  const createOption = async (data: any) => {
    const res = {
      value: data.id,
      label: data.culture_name,
    };
    content.push(res);
  };
  const list = await prisma.agrocalendar.findMany();
  await Promise.all(
    list.map((obj) => {
      const res = createOption(obj);
    })
  );
  const response = {
    content: content,
  };
  return NextResponse.json(response, { status: 200 });
}
