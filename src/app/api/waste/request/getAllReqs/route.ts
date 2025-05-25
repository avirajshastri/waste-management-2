import {connect} from "@/dbConfig/dbConfig"
import { NextRequest,NextResponse } from "next/server"
import Request from "@/models/request.models"


connect()

export async function GET(request:NextRequest){
    try {
        const allRequests = await Request.find({})
        .populate('userId','email') // poulate email of user
        .sort({requestedAt:-1});

        console.log("All requests",allRequests)
        return NextResponse.json(allRequests);
    } catch (error:any) {
        console.log("Not able to get all request",error)
        return NextResponse.json({error:error.message},{status:500})
    }
}