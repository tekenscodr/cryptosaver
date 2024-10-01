import { NextRequest, NextResponse } from "next/server";
import jwksClient from "jwks-rsa";
import jwt, { JwtPayload } from "jsonwebtoken";
import prisma from '../../../prismadb'

const client = jwksClient({
    jwksUri: `${process.env.KINDE_ISSUER_URL}/.well-known/jwks.json`,
});

export async function POST(req: NextRequest) {
    try {
        //Get token from request
        const token = await req.text();

        // Decode Token
        const jwtDecoded = jwt.decode(token, { complete: true })
        if (!jwtDecoded) {
            return NextResponse.json({ status: 500, statusText: "Error decoding jwt" })
        }
        const header = jwtDecoded.header;
        const kid = header.kid;

        // Verify token
        const key = await client.getSigningKey(kid);

        const signingKey = key.getPublicKey();

        const event = await jwt.verify(token, signingKey) as JwtPayload;


        // Handle various events
        switch (event?.type) {
            case "user.created":
                // Create User
                const checking = await event.data.user
                const newUser = await event.data.user
                await prisma.user.create({
                    data: {
                        kinde_id: newUser.id,
                        email: newUser.email,
                        firstname: newUser.first_name,
                        lastname: newUser.last_name
                    }
                })
                break;
            default:
                console.log("event not handled", event.type);
                break;

        }
        return NextResponse.json({ message: "success" }, { status: 200 })
    } catch (error) {
        if (error instanceof Error) {
            console.error(error);
            return NextResponse.json({ message: error.message }, { status: 500 });
        }
    }

}