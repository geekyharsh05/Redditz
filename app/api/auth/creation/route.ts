import prisma from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { connection, NextResponse } from "next/server";
import { generateUsername } from "unique-username-generator";

export async function GET() {
    await connection();
    const { getUser } = getKindeServerSession()
    const user = await getUser()

    if (!user || user === null || !user.id) {
        return new Response("Something went wrong, Please try again!", {
            status: 401,
        })
    }

    let dbUser = await prisma.user.findUnique({
        where: {
            id: user.id,
        },
    })

    if (!dbUser) {
        dbUser = await prisma.user.create({
            data: {
                id: user.id,
                email: user.email ?? "",
                firstName: user.given_name ?? "",
                lastName: user.family_name ?? "",
                imageUrl: user.picture ?? "",
                userName: generateUsername("-", 3, 15)
            },
        })
    }

    return NextResponse.redirect(process.env.NODE_ENV === "production" ? "https://redditz.theharsh.xyz" : "http://localhost:3000/")
}