"use client"
import axios from "axios"
import Link from "next/link"
import useSWR from "swr"
import { useProductStore } from "@/helpers/zustandProductStore"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useCartStore } from "@/helpers/zustandCartStore"
const fetcher = (url:string) => axios.get(url).then(res => res.data)

export default function Store(){
    const router = useRouter()
    const setProduct = useProductStore((state) => state.setProduct)
    const {addToCart} = useCartStore();
    const {data, error,isLoading} = useSWR('/api/product/getProducts',fetcher);

    console.log("product data",data)

    if(isLoading) return <p className="text-center">Loading Requests...</p>
    if(error) return <p className="text-center text-red-500">Error loading requests</p>

    const handleClick = (product:any)=>{
        setProduct(product)
        router.push("/store/singleProduct")
    }
    return(
        <>
        <h1 className="text-2xl mt-4 mb-8 ml-4">Feature Products</h1>
        <div className="mb-4 items-start flex gap-x-8 gap-y-16 flex-wrap px-4 md:px-8 lg:px-10 xl:px-15 2xl:px-20">
            {data?.map((product:any)=>{
                return(<div key={product._id} onClick={()=> handleClick(product)} className="flex flex-col justify-between h-[450px] w-full sm:w-[45%] lg:w-[22%] p-4 rounded-md shadow-sm">
                    <div className="w-full h-64 overflow-hidden rounded-md bg-gray-100">
                        <img
                        src={product.imgUrl}
                        alt="containers"
                        //fill
                        className="w-full h-full object-contain"
                        ></img>
                    </div>
                    <div className="flex justify-between">
                        <span className="font-medium">{product.name}</span>
                        <span className="font-semibold">Rs{product.price}</span>
                    </div>
                    <div className="text-sm text-gray-500">{product.description}</div>
                    <button className="rounded-2xl ring-1 ring-blue-500 text-blue-500 w-max py-2 px-4 text-xs hover:bg-blue-500 hover:text-white"
                    onClick={(e)=> {
                     e.stopPropagation();
                     addToCart(product)}}>Add to Cart</button>
                </div>)
            })}
            {/* <Link href="/store/singleProduct" className="w-full flex flex-col gap-4 sm:w-[45%] lg:w-[22%]">
                <div className="relative w-full h-80">
                    <img
                    src="https://res.cloudinary.com/dduk78qga/image/upload/v1747477736/hbrmhdsvr3qz0rehyvl8.png"
                    alt="containers"
                    //fill
                    sizes="25vw"
                    className="absolut object-cover rounded-md"
                    ></img>
                </div>
                <div className="flex justify-between">
                    <span className="font-medium">Product name</span>
                    <span className="font-semibold">Rs2</span>
                </div>
                <div className="text-sm text-gray-500">My description</div>
                <button className="rounded-2xl ring-1 ring-blue-500 text-blue-500 w-max py-2 px-4 text-xs hover:bg-blue-500 hover:text-white">Add to Cart</button>
            </Link>
            <Link href="/store/singleProduct" className="w-full flex flex-col gap-4 sm:w-[45%] lg:w-[22%]">
                <div className="relative w-full h-80">
                    <img
                    src="https://res.cloudinary.com/dduk78qga/image/upload/v1747477736/hbrmhdsvr3qz0rehyvl8.png"
                    alt="containers"
                    //fill
                    sizes="25vw"
                    className="absolut object-cover rounded-md"
                    ></img>
                </div>
                <div className="flex justify-between">
                    <span className="font-medium">Product name</span>
                    <span className="font-semibold">Rs2</span>
                </div>
                <div className="text-sm text-gray-500">My description</div>
                <button className="rounded-2xl ring-1 ring-blue-500 text-blue-500 w-max py-2 px-4 text-xs hover:bg-blue-500 hover:text-white">Add to Cart</button>
            </Link>
            <Link href="/store/singleProduct" className="w-full flex flex-col gap-4 sm:w-[45%] lg:w-[22%]">
                <div className="relative w-full h-80">
                    <img
                    src="https://res.cloudinary.com/dduk78qga/image/upload/v1747477736/hbrmhdsvr3qz0rehyvl8.png"
                    alt="containers"
                    //fill
                    sizes="25vw"
                    className="absolut object-cover rounded-md"
                    ></img>
                </div>
                <div className="flex justify-between">
                    <span className="font-medium">Product name</span>
                    <span className="font-semibold">Rs2</span>
                </div>
                <div className="text-sm text-gray-500">My description</div>
                <button className="rounded-2xl ring-1 ring-blue-500 text-blue-500 w-max py-2 px-4 text-xs hover:bg-blue-500 hover:text-white">Add to Cart</button>
            </Link>
            <Link href="/store/singleProduct" className="w-full flex flex-col gap-4 sm:w-[45%] lg:w-[22%]">
                <div className="relative w-full h-80">
                    <img
                    src="https://res.cloudinary.com/dduk78qga/image/upload/v1747477736/hbrmhdsvr3qz0rehyvl8.png"
                    alt="containers"
                    //fill
                    sizes="25vw"
                    className="absolut object-cover rounded-md"
                    ></img>
                </div>
                <div className="flex justify-between">
                    <span className="font-medium">Product name</span>
                    <span className="font-semibold">Rs2</span>
                </div>
                <div className="text-sm text-gray-500">My description</div>
                <button className="rounded-2xl ring-1 ring-blue-500 text-blue-500 w-max py-2 px-4 text-xs hover:bg-blue-500 hover:text-white">Add to Cart</button>
            </Link> */}
        </div>
        </>
        
    )
}