import { NextResponse } from "next/server";
import { prisma } from "@/prisma";
import { setCultureDetailsDto } from "./CultureDetailsDto";

export async function GET(req: Request, res: any) {
  const { cultureId } = res.params;
  const detailsList = await prisma.culture_details.findMany({
    where: {
      culture_id: parseInt(cultureId),
    },
  });

  const content: any = [];
  await Promise.all(
    detailsList.map(async (detail) => {
      const res = await setCultureDetailsDto(detail);
      content.push(res);
    })
  );

  const response = {
    content: content,
  };

  return NextResponse.json(response, { status: 200 });
}

export async function POST(req: Request, res: any) {
  const { values } = await req.json();
  const { cultureId } = res.params;
  console.log(values)
  try {
    await prisma.culture_details.create({
      data: {
        culture_id: parseInt(cultureId),
        task_name: values.taskName,
        task_type: parseInt(values.taskType),
        planned_from: new Date(values.plannedFrom),
        planned_to: new Date(values.plannedTo),
        price: parseInt(values.price),
        status: 3,
      },
    });
    return NextResponse.json("Created Successfully", { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json("Something Went Wrong", { status: 400 });
  }
}
