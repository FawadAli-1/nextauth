import { connectToDatabase } from "@/db/connection";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/user.model";



connectToDatabase()

export async function POST(req: NextRequest){
    try {
        const reqBody = await req.json()
        const {token} = reqBody
        console.log(token)

        const user = await User.findOne({verifyToken: token, verifyTokenExpiry: {$gt: Date.now()}})

        if(!user){
            return NextResponse.json({ error: "User may not exist or token is invalid"}, {status: 400})
        }
        console.log(user)

        user.isVerified = true
        user.verifyToken = undefined
        user.verifyTokenExpiry = undefined

        await user.save()

        return NextResponse.json({
            message: "User verified successfully",
            success: true
        }, {status: 200})


    } catch (error:any) {
        return NextResponse.json({ error: error.message }, {status: 500})
    }
}