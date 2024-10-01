import { NextResponse } from "next/server";
import prisma from '../../prismadb'
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
export async function GET() {
    try {
        const { getUser } = getKindeServerSession();
        const user = await getUser();
        const userID = await prisma.user.findFirst({
            where: {
                kinde_id: user.id
            }
        })
        const data = await prisma.fiatAc.findFirst({
            where: {
                userId: userID?.id
            }
        })
        return NextResponse.json({ data })

    } catch (error) {
        return NextResponse.json(error)
    }
}