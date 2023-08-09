import {connect} from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
const bcrypt = require('bcrypt');
import { sendEmail } from "@/helpers/mailer";

connect()

export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json()
        const {password, email, token } = reqBody
        console.log("Data", password, email, token)
        console.log(reqBody);

        const user = await User.findOne({forgotPasswordToken: token, forgotPasswordTokenExpiry: {$gt: Date.now()}})
        
        if (!user) {
            return NextResponse.json({error: "Invalid token"}, {status: 400})
        }

        //check if user already exists
        //const searchUser = await User.findOne({email})

        //hash password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        console.log("password", hashedPassword )
        
        const savedUser = await user.updateOne( {password: hashedPassword} )
        console.log(savedUser);

        user.forgotPasswordToken = undefined;
        user.forgotPasswordTokenExpiry = undefined;
        await user.save();

        return NextResponse.json({
            message: "User Password Changed Successfully",
            success: true,
        })
        
    } catch (error: any) {
        console.log("Error:", error.message);
        return NextResponse.json({error: error.message}, {status: 500})

    }
}