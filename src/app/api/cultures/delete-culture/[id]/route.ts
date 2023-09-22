import { NextResponse } from "next/server";
import { prisma } from "@/prisma";

export async function DELETE(req: Request, res: any) {
    const {params} = res;
    try {
        await prisma.cultures.delete({
            where: {
                id: parseInt(params.id)
            }
        })
        return NextResponse.json("Deleted Successfully", {status: 200})
    } catch(error) {
        return NextResponse.json("Something Went Wrong", {status: 400})
    }
}