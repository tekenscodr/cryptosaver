import { NextResponse } from "next/server";

export async function GET() {
    try {
        console.log("removed")
        return NextResponse.json({ remove: "removed" })

    } catch (error) {
        return NextResponse.json(error)
    }
}