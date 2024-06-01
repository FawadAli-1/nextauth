import { connectToDatabase } from "@/db/connection";
import User from "@/models/user.model";
import { NextResponse, NextRequest } from "next/server";
import jwt from "jsonwebtoken"
import { compare } from "bcrypt";

connectToDatabase()

export async function POST(req: NextRequest){
    const reqBody = await req.json()
    const {email, password} = reqBody

    console.log(reqBody);

    //Checking if user exists
    const user = await User.findOne({email})
    if(!user) return NextResponse.json({ message: "User does not exist"}, {status: 400})

    console.log("User exists in DB")

    const validatedPassword = await compare(password, user.password)
    if (!validatedPassword) {
        return NextResponse.json({ error: "Invalid password"}, {status: 400})
    }

    const tokenData = {
        id: user._id,
        username: user.username,
        email: user.email
    }

    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expiresIn: "1d"})

    const response = NextResponse.json({
        message: "Successfully logged in",
        success: true
    })

    response.cookies.set("token", token, {
        httpOnly: true
    })

    return response
}