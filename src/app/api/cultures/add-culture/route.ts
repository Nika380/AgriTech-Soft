import { NextResponse } from "next/server";
import { prisma } from "@/prisma";

export async function POST(req: Request, res: any) {
  const { values } = await req.json();
  try {
    await prisma.cultures.create({
      data: {
        culture_name: values.cultureName,
        culture_location: values.location,
        square_meter: values.squareMeter,
      },
    });
    return NextResponse.json("culture added successfully", { status: 201 });
  } catch (error: any) {
    console.log(error)
    return NextResponse.json(error, { status: 400 });
  }
}
