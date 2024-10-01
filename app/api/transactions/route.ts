import { NextResponse } from "next/server";
import prisma from '../../prismadb'
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export async function GET() {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    try {
        const transactions = await prisma.transaction.findMany({
            where: {
                userId: user.id, // Replace with actual user ID
            },
            select: {
                id: true,
                amount: true,
                status: true,
                userId: true,
            },
        });
        return NextResponse.json({ transactions })

    } catch (error) {
        return NextResponse.json(error)
    }
}

