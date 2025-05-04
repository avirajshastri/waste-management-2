import {connect} from "@/dbConfig/dbConfig"
import { NextRequest,NextResponse } from "next/server"
import User from "@/models/user.models"
import bcryptjs from "bcryptjs"


connect()


export async function POST(request:NextRequest){
    try {
        const reqBody = await request.json()

        const {password, ftoken} = reqBody

        console.log(ftoken);

        const user = await User.findOne({
            forgotPasswordToken: ftoken,
            forgotPasswordTokenExpiry:{$gt: Date.now()}
        })

        if(!user)
        {
            console.log("Invalid token",user)
            return NextResponse.json({
                error:"Invalid Token",
                status:400
            })
        }

        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password,salt)

        user.password = hashedPassword
        await user.save()

        return NextResponse.json({
            message: "Password changes successfully",
            success:true,
        })

    } catch (error:any) {
        console.log("Error in changing password")
        return NextResponse.json({error:error.message},{status:500})
    }
}