'use server'
import { z } from "zod"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import prisma from '../../prismadb';

export const CreateTransactionSchemaType = z.object({
    userId: z.string(),
    type: z.string(),
    status: z.string(),
    destination: z.string(),
    amount: z.number(),
    description: z.string(),
})



const date = new Date();

export async function CreateTransaction(form: z.infer<typeof CreateTransactionSchemaType>) {
    try {
        const { getUser } = getKindeServerSession();
        const parsedBody = await CreateTransactionSchemaType.safeParse(form);
        if (!parsedBody.success) {
            throw new Error(parsedBody.error.message);
        }
        const user = await getUser();
        if (!user) {
            redirect('/api/auth/login');
        }
        const userID = await prisma.user.findFirst({
            where: {
                kinde_id: user.id
            }, select: {
                id: true
            }
        });
        if (!userID) {
            throw new Error("User not found")
        }
        console.log("userID", userID)
        const id = await userID.id as string;
        const { amount, type, status, destination, description, userId } = parsedBody.data as z.infer<typeof CreateTransactionSchemaType>;

        await prisma.$transaction([
            prisma.transaction.create({
                data: {
                    amount,
                    type,
                    status,
                    destination,
                    description,
                    userId: id,

                }
            }),

            //Update Month aggregate table 
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
                    debit: type === "debit" ? amount : 0,
                    credit: type === "credit" ? amount : 0,

                },
                update: {
                    debit: {
                        increment: type === "debit" ? amount : 0,
                    },
                    credit: {
                        increment: type === "credit" ? amount : 0,
                    }
                }
            })
            ,

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
                    debit: type === "debit" ? amount : 0,
                    credit: type === "credit" ? amount : 0,

                },
                update: {
                    debit: {
                        increment: type === "debit" ? amount : 0,
                    },
                    credit: {
                        increment: type === "credit" ? amount : 0,
                    }
                }
            })
        ])
    } catch (error) {
        console.log(error)
        throw new Error('Transaction creation failed');

    }


}