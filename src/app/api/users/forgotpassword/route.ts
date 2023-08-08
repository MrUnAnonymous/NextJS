import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server"
import User from '@/models/userModel'
import Link from "next/link";
import { sendEmail } from "@/helpers/mailer";


connect()

export async function POST (request : NextRequest) {
    
    try {
        const reqBody = await request.json()
        const { email } = reqBody
        const user = await User.findOne({email})
        if (!user) {
            return NextResponse.json({error: "Invalid Email"}, {status: 400})
        }

        //send verification email
        sendEmail({email, emailType: "RESET", userId: user._id})

        // const verifytoken = await User.findOne({forgotPasswordToken: token, forgotPasswordExpiry: {$gt: Date.now()}})
        // if (!verifytoken){
        //     return NextResponse.json({error: "Invalid Token"}, {status: 400})
        // }
        // console.log(verifytoken)

    } catch (error: any) {
        return NextResponse.json({ error: error.message}, {status: 400})
    }
}