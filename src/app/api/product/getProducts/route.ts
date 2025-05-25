import {connect} from '@/dbConfig/dbConfig'
import { NextRequest,NextResponse } from 'next/server'
import Product from '@/models/product.models'

connect()

export async function GET(request:NextRequest)
{
    try {
        const allProducts = await Product.find({})

        console.log("Sare products",allProducts)
        return NextResponse.json(allProducts)
    } catch (error:any) {
        console.log("Unable to get products",error)
        return NextResponse.json({error:error.message},{status:500})
    }
}