import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import prisma from '../../../prismadb'
import { NextResponse } from 'next/server';

/* To Add To Contribution*/
export async function POST(request: Request, context: any) {
    const { getUser } = getKindeServerSession();
    const userID = await getUser();
    try {
        const body = await request.json();
        console.log(body)
        // Find Plan
        const plan = await prisma.plan.findFirst({
            where: {
                id: body.plan as string
            }
        });
        if (!plan) {
            console.log('plan not found');
            return NextResponse.json({ message: "plan is no longer in the system" });
        }
        // Find User
        const user = await prisma.user.findFirst({
            where: {
                kinde_id: userID.id,
            },
            select: {
                id: true
            }
        });
        if (!user) {
            console.log('user not found')
            return NextResponse.json({ message: "User not Found" })
        };
        // GET CRYPTO BALANCE
        const getCrypto = await prisma.cryptoAc.findFirst({
            where: {
                userId: user?.id
            }
        });
        if (!getCrypto) {
            console.log('creating a new crypto wallet')
        }
        // GET FIAT BALANCE 
        const getFiat = await prisma.fiatAc.findFirst({
            where: {
                userId: user.id
            },

            select: {
                account_balance: true
            }
        });
        if (!getFiat) {
            console.log('Fiat account not found')
            return NextResponse.json({ message: 'fiat account not found' });
        }
        if (Number(body.amount) > Number(getFiat.account_balance)) {
            console.log('Account is low')
            return NextResponse.json({ message: "Account is Low" });
        }

        const expectedAmt = plan?.budget
        if (Number(plan?.balance) > Number(expectedAmt)) {
            console.log("Error Found")
            return NextResponse.json({ message: 'Error found' })
        }
        const deduction = await prisma.$transaction([
            prisma.fiatAc.update({
                where: {
                    userId: user?.id
                },
                data: {
                    account_balance: parseFloat((Number(getFiat.account_balance) - Number(body.amount)).toFixed(2))

                }
            }),
            prisma.plan.update({
                where: {
                    id: body.plan as string
                },
                data: {
                    balance: parseFloat(Number(plan?.balance) + Number(body.amount).toFixed(2))
                }
            }),
            prisma.cryptoAc.upsert({
                where: {
                    userId: user.id
                },
                create: {
                    userId: user.id,
                    account_balance: body.amount,
                },
                update: {
                    account_balance: parseFloat((Number(getCrypto?.account_balance) + Number(body.amount)).toFixed(2)),
                }
            }),
            prisma.transaction.create({
                data: {
                    amount: body.amount,
                    userId: user.id,
                    type: 'debit',
                    status: 'Complete',
                    destination: 'crypto',
                    description: `adding to plan ${plan?.plan_name}`

                }
            })
        ])
        console.log(deduction)
        return NextResponse.json({ deduction })
    } catch (error: any) {
        return NextResponse.json(error.message)
    }
}