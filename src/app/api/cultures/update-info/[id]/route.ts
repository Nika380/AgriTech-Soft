import { NextResponse } from "next/server";
import { prisma } from "@/prisma";

export async function PUT(req: Request, res: any) {
  const { values } = await req.json();
  const { params } = res;

  try {
    await prisma.cultures.update({
      where: {
        id: parseInt(params.id),
      },
      data: {
        culture_location: values.location,
        culture_name: values.name,
        square_meter: parseInt(values.squareMeter),
      },
    });
    return NextResponse.json("Updated Successfully", { status: 200 });
  } catch (error) {
    return NextResponse.json("Something Went Wrong", { status: 400 });
  }
}
