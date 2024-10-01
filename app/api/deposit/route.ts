import { NextRequest, NextResponse } from "next/server";
import prisma from '../../prismadb'
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";


export async function POST(req: NextRequest) {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    const date = new Date();

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
        const id = userID.id

        const body = await req.json();
        const data = { ...body, userId: id }

        await prisma.$transaction([

            // Create transaction
            prisma.transaction.create({
                data: {
                    amount: data.amount,
                    type: data.type,
                    status: data.status,
                    destination: data.destination,
                    description: data.description,
                    userId: userID.id,
                }
            }),

            // Update Month aggregate table 
            prisma.monthHistory.upsert({
                where: {
                    day_month_year_userId: {
                        userId: userID.id,
                        day: date.getUTCDate(),
                        month: date.getUTCMonth(),
                        year: date.getUTCFullYear(),
                    }
                },
                create: {
                    userId: userID.id,
                    day: date.getUTCDate(),
                    month: date.getUTCMonth(),
                    year: date.getUTCFullYear(),
                    debit: data.type === "debit" ? data.amount : 0,
                    credit: data.type === "credit" ? data.amount : 0,
                },
                update: {
                    debit: {
                        increment: data.type === "debit" ? data.amount : 0,
                    },
                    credit: {
                        increment: data.type === "credit" ? data.amount : 0,
                    }
                }
            }),

            // Update Year Aggregate Table
            prisma.yearHistory.upsert({
                where: {
                    month_year_userId: {
                        userId: userID.id,
                        month: date.getUTCMonth(),
                        year: date.getUTCFullYear(),
                    }
                },
                create: {
                    userId: userID.id,
                    month: date.getUTCMonth(),
                    year: date.getUTCFullYear(),
                    debit: data.type === "debit" ? data.amount : 0,
                    credit: data.type === "credit" ? data.amount : 0,
                },
                update: {
                    debit: {
                        increment: data.type === "debit" ? data.amount : 0,
                    },
                    credit: {
                        increment: data.type === "credit" ? data.amount : 0,
                    }
                }
            }),
            prisma.fiatAc.update({
                where: {
                    userId: userID.id
                },
                data: {
                    userId: userID.id,
                    account_balance: {
                        increment: data.amount
                    }
                }
            })
        ]);

        return NextResponse.json({ message: "success", data: {} }, { status: 200 })
    } catch (error) {
        if (error instanceof Error) {
            console.error(error);
            return NextResponse.json({ message: "failed", error: error.message }, { status: 500 });
        }
    }
}