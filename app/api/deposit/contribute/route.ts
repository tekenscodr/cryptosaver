import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import prisma from '../../../prismadb'
import { NextResponse } from 'next/server';
import { Decimal } from '@prisma/client/runtime/library';

export async function PUT(request: Request) {
    const { getUser } = getKindeServerSession();
    const userID = await getUser();
    try {
        const body = await request.json();
        const user = await prisma.user.findFirst({
            where: {
                kinde_id: userID.id,
            },
            select: {
                id: true
            }
        })
        if (!user) throw new Error('error')
        const getFiat = await prisma.fiatAc.findFirst({
            where: {
                userId: user?.id
            },

            select: {
                account_balance: true
            }
        })
        const deduction = await prisma.$transaction([
            prisma.fiatAc.update({
                where: {
                    userId: user?.id
                },
                data: {
                    account_balance: parseFloat((Number(getFiat?.account_balance) - Number(body.amount)).toFixed(2))

                }
            }),
            prisma.transaction.update({
                where: {

                    userId: user.id,
                },
                data: {
                    amount: body.amount,

                }
            })
        ])
        return NextResponse.json({ deduction })
    } catch (error: any) {
        return NextResponse.json(error.message)
    }
}