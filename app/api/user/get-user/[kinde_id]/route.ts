import { NextRequest, NextResponse } from "next/server";
import prisma from '../../../../prismadb'

export async function GET(req: Request, context: any) {
    try {
        const { params } = context;
        const userId = params.kinde_id as string;
        if (!userId) {
            return NextResponse.json({ error: 'User ID is missing' });
        }
        const user = await prisma.user.findFirst({
            where: {
                kinde_id: userId
            },
            select: {
                id: true
            }
        })
        console.log('[USER]', user)
        return NextResponse.json(user, { status: 200 })
    } catch (error) {
        return NextResponse.json({ msg: "Failed", error: error }, { status: 500 })
    }
}