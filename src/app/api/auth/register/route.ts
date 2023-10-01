import { NextResponse } from "next/server";
import { prisma } from "@/prisma";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  const { email, password, userName } = await req.json();
  const checkUser = await prisma.users.findFirst({
    where: {
      email: email,
    },
  });
  if (checkUser) {
    return NextResponse.json("User With This Email Or Phone Already Exists", {
      status: 400,
    });
  }
  try {
    const hashedPass = await bcrypt.hash(password, 10);
    await prisma.users.create({
      data: {
        email: email,
        password: hashedPass,
        first_name: userName
      },
    });
    return NextResponse.json("Account Created", { status: 201 });
  } catch (error) {
    return NextResponse.json("Something Went Wront", { status: 400 });
  }
}
