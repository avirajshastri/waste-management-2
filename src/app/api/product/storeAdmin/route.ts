import { NextRequest,NextResponse } from "next/server";
import {connect} from '@/dbConfig/dbConfig'
import Product from '@/models/product.models'


connect()

export async function POST(request:NextRequest){
    try {
        const reqBody = await request.json()

        // console.log("Server aaya",reqBody)

        const {name,description, imgUrl, price,stock} = reqBody;

        

        const product = new Product({
            name,
            description,
            imgUrl,
            price,
            stock,
            available : stock>0 ? 1:0,
        })

        const savedProduct = await product.save()
        console.log(savedProduct);

        return NextResponse.json({
            message:"Product added successfully",
            success:true,
            savedProduct
        })
    } catch (error:any) {
        console.log("Not able to add product server side",error)
        return NextResponse.json({error:error.message},{status:500})
    }
}