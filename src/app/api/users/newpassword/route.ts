import {connect} from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
const bcrypt = require('bcrypt');
import { sendEmail } from "@/helpers/mailer";

connect()

export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json()
        const {password, email} = reqBody
        console.log(reqBody);

        //check if user already exists
        const user = await User.findOne({email})
        if(user){
            return NextResponse.json({error: "Password Sucessfully Changed"}, {status: 201})
        }

        //hash password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        console.log("password", hashedPassword )

        const savedUser = await user.updateOne( {password: hashedPassword } )
        console.log(savedUser);

        return NextResponse.json({
            message: "User Password Changed Successfully",
            success: true,
            savedUser
        })
        
    } catch (error: any) {
        console.log("Error:", error.message);
        return NextResponse.json({error: error.message}, {status: 500})

    }
}