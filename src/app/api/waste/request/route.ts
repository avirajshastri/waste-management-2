import {connect} from '@/dbConfig/dbConfig'
import { NextRequest,NextResponse } from 'next/server'
import Request from '@/models/request.models'
import jwt from "jsonwebtoken"
import { cookies } from 'next/headers'
import { getDataFromToken } from '@/helpers/getDataFromToken'


export async function POST(request:NextRequest){
    try {
        console.log(request);
        const reqBody = await request.json()
        const {wasteType, location, imgUrl} = reqBody

        console.log("Khuch ni aaya",reqBody);
        //token is stored in cookie when user logged in
        // const cookieStore =cookies()
        // const token = (await cookieStore).get('token')?.value
        //already helper me method likhi h 
        const userId = getDataFromToken(request)

        // const userRequest = await Request.findOne({
        //     $or:[
        //         {userId},
        //         {imgUrl},
        //     ]
        // })

        // if(userRequest)
        // {
        //     console.log("Request already exist");
        //     return NextResponse.json({error: "Request already exist"},{status:401})
        // }
        
        const newRequest = new Request({
            userId,
            wasteType,
            location,
            imgUrl,
            status: "PENDING",
            requestedAt: Date.now(),
            collectorId: null, // collecteorId can be updated by backend logic in collector request route (await Request.findByIdAndUpdate(requestId, { collectorId: someCollectorId });)
        })

        console.log(newRequest)
        const savedRequest = await newRequest.save()
        console.log(savedRequest)

        return NextResponse.json({
            message:"Request created successfully",
            success:true,
            savedRequest,
        })


    } catch (error:any) {
        console.log("Unable to submit request",error)
        return NextResponse.json({error: error.message},{status:500})
    }
}