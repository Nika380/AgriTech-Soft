import { NextResponse } from "next/server";
import { prisma } from "@/prisma";
import { setCultureDto } from "./CulturesDto";

export async function POST(req: Request, res: any) {
  const userEmail: any = req.headers.get("email");
  const user = await prisma.users.findFirst({
    where: {
      email: userEmail,
    },
  });
  console.log(userEmail);
  const culturesList = await prisma.cultures.findMany({
    where: {
      created_by: user?.id,
    },
  });
  const content: any = [];

  await Promise.all(
    culturesList.map(async (culture) => {
      const res = await setCultureDto(culture);
      content.push(res);
    })
  );

  const response: any = {
    content: content,
  };

  return NextResponse.json(response, { status: 200 });
}
