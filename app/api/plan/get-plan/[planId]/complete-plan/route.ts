import { NextRequest, NextResponse } from "next/server";
import prisma from '../../../../../prismadb'


export async function PUT(req: Request, context: any) {
    const { params } = context;
    const planId = params.userId as string;
    if (!planId) {
        return NextResponse.json({ error: 'Plan ID is missing' });
    }
    try {
        const complete_plan = await prisma.plan.update({
            where: {
                id: planId
            },
            data: {
                isComplete: true
            }
        })
        return NextResponse.json({ message: "Success", data: complete_plan }, { status: 200 })
    } catch (error) {
        if (error instanceof Error) {
            console.error(error);
            return NextResponse.json({ message: "failed", error: error.message }, { status: 500 });
        }
    }
}