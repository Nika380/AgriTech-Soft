import { NextResponse } from "next/server";
import { prisma } from "@/prisma";

export async function DELETE(req: Request, res: any) {
  const { detailId } = res.params;
  try {
    await prisma.culture_details.delete({
      where: {
        id: parseInt(detailId),
      },
    });
    return NextResponse.json("Deleted Successfully", { status: 200 });
  } catch (error) {
    return NextResponse.json("Something Went Wrong", { status: 400 });
  }
}

export async function PUT(req: Request, res: any) {
  const { detailId } = res.params;
  const { values } = await req.json();

  try {
    await prisma.culture_details.update({
      where: {
        id: parseInt(detailId),
      },
      data: {
        task_name: values.taskName,
        task_type: parseInt(values.taskType),
        price: parseInt(values.price),
        planned_at: new Date(values.plannedAt),
      },
    });    
    return NextResponse.json("Updated succesfully", { status: 200 });
  } catch (error) {
    console.log(error)
    return NextResponse.json("Something Went Wrong", { status: 400 });
  }
}
