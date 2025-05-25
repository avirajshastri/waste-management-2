import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import {connect} from "@/dbConfig/dbConfig"
import Request from "@/models/request.models";

connect()

export async function GET(request:NextRequest)
{
    try {
        console.log('aaya')
        const userId= await getDataFromToken(request);
        console.log(userId);
        const requests = await Request.find({userId}).sort({requestedAt:-1});
        console.log("All user requests:",requests);
        return NextResponse.json(requests);
    } catch (error:any) {
        console.log("Error in getting request of user",error)
        return NextResponse.json({error:error.message},{status:500})
    }
}