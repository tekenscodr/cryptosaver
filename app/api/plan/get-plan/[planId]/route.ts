import { NextRequest, NextResponse } from "next/server";
import prisma from '../../../../prismadb'


export async function GET(req: Request, context: any) {
    const { params } = context;
    const planId = params.userId as string;
    if (!planId) {
        return NextResponse.json({ error: 'Plan ID is missing' });
    }
    try {
        const plan = await prisma.plan.findFirst({
            where: {
                id: planId
            }
        })
        return NextResponse.json({ message: "Success", data: plan }, { status: 200 })
    } catch (error) {
        if (error instanceof Error) {
            console.error(error);
            return NextResponse.json({ message: "failed", error: error.message }, { status: 500 });
        }
    }
}