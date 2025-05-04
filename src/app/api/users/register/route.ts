import {connect} from "@/dbConfig/dbConfig"
import User from "@/models/user.models.js"
import { NextRequest,NextResponse } from "next/server"
import bcryptjs from "bcryptjs"
import { sendEmail } from "@/helpers/mailer"


connect()


export async function POST(request:NextRequest){
    try {
        const reqBody = await request.json()
        const {fullName,role,email,phoneNumber,password}= reqBody

        // console.log(reqBody)
        //check if user exist
        // console.log()
        const user =await User.findOne({
            $or: [
                {email},
                {phoneNumber},
            ]}
            )

        console.log(user)

        if(user){
            console.log('user already exist')
            return NextResponse.json({error:"User already exist"},{status:400})
        }
        //hash password

        const salt = await bcryptjs.genSalt(10)
        const hashedPassword =await bcryptjs.hash(password,salt)
        // console.log(hashedPassword)

        const newUser = new User({
            fullName,
            email,
            phoneNumber,
            password:hashedPassword,
            role,
        })
        
        // console.log(newUser)

        const savedUser = await newUser.save()
        console.log(savedUser);

        //send verification email
        await sendEmail({email,emailType:"VERIFY", userId: savedUser._id})

        return NextResponse.json({
            message:"Account created successfully",
            success:true,
            savedUser
        })
    } catch (error:any) {
        return NextResponse.json({error:error.message}, {status:500})
    }
}