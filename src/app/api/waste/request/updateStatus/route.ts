import {connect} from "@/dbConfig/dbConfig"
import { NextRequest,NextResponse } from "next/server"
import Request from "@/models/request.models"
import User from "@/models/user.models"


connect()

export async function PUT(request:NextRequest){
    try {
        const reqBody = await request.json()
        const {userId,id,status} = reqBody

        if(status === "COMPLETED")
        {
            try {
                await User.findByIdAndUpdate(
                    userId,
                    {
                        $inc: {creditPoints:1}
                    }
                )
            } catch (error:any) {
                console.log("Not able to update credit score",error)
            }
        }
        const updated = await Request.findByIdAndUpdate(
            id,
            {
                status,
                collectedAt: status === "COMPLETED" ? new Date(): null,
            },
            {new: true}
        )

        return NextResponse.json({
            message:"Status update successfully",
            success:true,
            updated,
        })
    } catch (error:any) {
        console.log("Not able to update status", error)
        return NextResponse.json({error:error.message},{status:500})
    }
}