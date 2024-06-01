import { connectToDatabase } from "@/db/connection";
import User from "@/models/user.model";
import { NextResponse, NextRequest } from "next/server";
import bcrypt from "bcrypt"
import { sendEmail } from "@/utils/mailer";

connectToDatabase()

export async function POST(req: NextRequest){

    

    try {
        
        const reqBody = await req.json()
        console.log(reqBody)
        const {username, email, password } = reqBody

        // Check if a user exists already 
        const user = await User.findOne({email})
        if(user) return NextResponse.json({ error: "User already exists" }, {status: 409})
        
        // Hash a password to save in DB
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        // Create a new user in DB
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        })

        // Save newUser in DB
        const savedUser = await newUser.save()
        console.log(savedUser)

        // Send Email
        await sendEmail({email, emailType: "VERIFY", userId: savedUser._id})
        return NextResponse.json({ message: "User registered successfully", success: true, savedUser })

    } catch (error:any) {
        return NextResponse.json({ error: error.message }, {status: 500})
    }
}