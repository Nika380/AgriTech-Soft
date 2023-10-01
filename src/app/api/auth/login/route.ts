import { NextResponse } from "next/server";
import { prisma } from "@/prisma";
import bcrypt from "bcrypt";
import { sign } from "jsonwebtoken";

export async function POST(req: Request, res: any) {
  const secret: string = process.env.JWT_SECRET_KEY || "";
  const { email, password } = await req.json();
  const user = await prisma.users.findFirst({
    where: {
      email: email,
    },
  });
  try {
    let checkPass = await bcrypt.compare(password, user?.password || "");
    if (checkPass) {
      const token = sign({ email: user?.email || "" }, secret, {
        expiresIn: "30m",
        algorithm: "HS256",
      });
      const refreshToken = sign({ email: user?.email || "" }, secret, {
        expiresIn: "7d",
        algorithm: "HS256",
      });
      const headers: any = [
        ["Set-Cookie", `token=${token}; Path=/; Max-Age=${30 * 60}; HttpOnly`],
        [
          "Set-Cookie",
          `refreshToken=${refreshToken}; Path=/; Max-Age=${
            60 * 60 * 24 * 7
          }; HttpOnly`,
        ],
      ];
      return NextResponse.json("Logged In", { status: 202, headers });
    } else {
      return NextResponse.json("Passwrod is incorrect", { status: 400 });
    }
  } catch (error) {
    return NextResponse.json("Incorrect Login Or Passowrd", { status: 400 });
  }
}
