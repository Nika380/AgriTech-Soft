import { NextResponse } from "next/server";
import { decode, verify } from "jsonwebtoken";
import cookie from "cookie";
import { prisma } from "@/prisma";

const secret: string = process.env.NEXT_PUBLIC_JWT_SECRET || "";

export async function POST(req: Request) {
  const cookies = req.headers.get("Cookie") || "";
  const parsedCookies = cookie.parse(cookies);
  const token = verify(parsedCookies.token, secret);
  if (token === null || token === "" || token === undefined) {
    return NextResponse.json("You Are Signed Out", {status: 400});
  } else {
    const decodedToken: any = decode(parsedCookies.token)
    const user = await prisma.users.findFirst({
      where: {
        email: decodedToken?.email
      }
    })
    return NextResponse.json("Token Is Valid", {status: 200});
  }
}

