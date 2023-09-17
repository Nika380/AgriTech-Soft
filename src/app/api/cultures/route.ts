import { NextResponse } from "next/server";
import { prisma } from "@/prisma";
import { setCultureDto } from "./CulturesDto";

export async function POST(req: Request, res: any) {
  const culturesList = await prisma.cultures.findMany();
  const content: any = [];

  await Promise.all(
    culturesList.map(async (culture) => {
      const res = await setCultureDto(culture);
      content.push(res);
      console.log(culture)
    })
  );

  const response: any = {
    content: content,
  };

  return NextResponse.json(response, { status: 200 });
}
