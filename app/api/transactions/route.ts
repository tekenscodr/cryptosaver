import { NextResponse } from "next/server";
import prisma from '../../prismadb'

export async function GET() {
    try {
        const transactions = await prisma.transaction.findMany({
            where: {
                userId: 'your_user_id', // Replace with actual user ID
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

