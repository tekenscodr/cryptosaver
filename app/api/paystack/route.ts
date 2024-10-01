// import prisma from "../../../prismadb"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import axios from "axios";
import { NextResponse } from "next/server"
// import { NextApiResponse, NextApiRequest } from 'next';

export async function POST(request: Request) {
    const body = await request.json()
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    const url = "https://api.paystack.co/transaction/initialize";
    const authorization = "Bearer sk_test_d4061fac60668a5522d7eddc0633749888de3b57";
    const contentType = "application/json";
    const data = {
        email: user.email,
        amount: (parseFloat(body.amount) * 100).toString()
    }

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                Authorization: authorization,
                "Content-Type": contentType
            },
            body: JSON.stringify(data)
        });
        if (!response.ok) {
            return NextResponse.json({ msg: "Payment Unsuccessful" })
        }
        const responseData = await response.json();
        const reference: string = await responseData.data.reference
        console.log(reference)
        const new_data = { ...data, type: "credit", status: 'Completed', destination: "Fiat", description: body.description }
        console.log(new_data)
        return NextResponse.json({ responseData })
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.error()
    }
}
