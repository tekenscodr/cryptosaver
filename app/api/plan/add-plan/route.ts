import { NextRequest, NextResponse } from "next/server";
import prisma from '../../../prismadb'
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";


export async function POST(req: NextRequest) {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    try {
        // Get User ID
        const userID = await prisma.user.findFirst({
            where: {
                kinde_id: user.id
            },
            select: {
                id: true
            }
        })
        if (!userID) throw new Error("User not found");
        const id = await userID.id
        const body = await req.json();
        const data = { ...body, userId: id }
        const plan = await prisma.plan.create({
            data: data
        })
        return NextResponse.json({ message: "success", data: plan }, { status: 200 })
    } catch (error) {
        if (error instanceof Error) {
            console.error(error);
            return NextResponse.json({ message: "failed", error: error.message }, { status: 500 });
        }
    }
}