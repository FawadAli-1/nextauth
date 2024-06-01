import { connectToDatabase } from "@/db/connection";
import User from "@/models/user.model";
import { getDataFromToken } from "@/utils/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";

connectToDatabase()

export async function POST(req: NextRequest){
    const userId = await getDataFromToken(req)

    const user = await User.findOne({_id: userId}).select("-password")

    return NextResponse.json({
        message: "User found",
        data: user
    })
}