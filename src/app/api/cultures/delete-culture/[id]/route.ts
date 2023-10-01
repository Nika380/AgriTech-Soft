import { NextResponse } from "next/server";
import { prisma } from "@/prisma";

export async function DELETE(req: Request, res: any) {
  const { id } = res.params;
  try {
    await prisma.culture_details.deleteMany({
      where: {
        culture_id: parseInt(id),
      },
    });
    await prisma.cultures.delete({
      where: {
        id: parseInt(id),
      },
    });
    return NextResponse.json("Deleted Successfully", { status: 200 });
  } catch (error) {
    return NextResponse.json("Something Went Wrong", { status: 400 });
  }
}
