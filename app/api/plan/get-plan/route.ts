import { NextResponse } from "next/server";
import prisma from '../../../prismadb'
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";


export async function GET() {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    if (!user) return NextResponse.json({ message: "user cannot be found!" });
    try {
        const userID = await prisma.user.findFirst({
            where: {
                kinde_id: user?.id
            },
            select: {
                id: true
            }
        })
        if (!userID) throw new Error("User not found")
        const plans = await prisma.plan.findMany({
            where: {
                userId: userID.id
            }
        })
        return NextResponse.json({ message: "Success", data: plans }, { status: 200 })
    } catch (error) {
        if (error instanceof Error) {
            console.error(error);
            return NextResponse.json({ message: "Failed", error: error.message }, { status: 500 });
        }
    }
}