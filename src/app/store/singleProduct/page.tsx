"use client"

import { useState,useEffect } from "react"
import { useProductStore } from "@/helpers/zustandProductStore";
import { useRouter } from "next/navigation";
import {useCartStore} from "@/helpers/zustandCartStore"

export default function SingleProduct(){
    const [quantity,setQuantity] = useState(1);

    const product = useProductStore((state)=> state.product)
    const router = useRouter()
    const addToCart = useCartStore((state)=> state.addToCart)

    useEffect(()=>{
        if(!product)
        {
            router.push("/store")  // redirect if no product set
        }
    },[product,router])

    if(!product)
        return <div>Loading...</div>
    //temp
    //const stock =4;

    const handleQuantity = (type: "i" | "d")=>{
        if(type === "d" && quantity>1)
            setQuantity(quantity-1);
        else if(type === "i" && quantity<product.stock)
            setQuantity(quantity+1);
    }
    const handleAddToCart = ()=>{
        if(!product) return;
        addToCart({
            _id: product._id,
            name: product.name,
            imgUrl: product.imgUrl,
            price: product.price,
            quantity,
            stock: product.stock
        })
    }
    return(
        <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 relative flex flex-col lg:flex-row gap-16">
            <div className="w-full lg:w-1/2 lg:sticky top-20 h-max">
                <div className="relative">
                    <img src={product.imgUrl} alt="img"
                    //fill
                    sizes="50vw"
                    className="object-cover rounded-md" />
                </div>
            </div>
            <div className="w-full lg:w-1/2 flex flex-col gap-6">
                <h1 className="text-4xl font-medium">{product.name}</h1>
                <p className="text-gray-500">{product.description}  
                </p>
                <div className="h-[2px] bg-gray-100">
                    <h2 className="font-medium text-2xl mt-2">Rs{product.price}</h2>
                </div>

                <div className="h-[2px] bg-gray-100 mt-5"></div>
                <div className="flex flex-col gap-4">
                    <h4 className="font-medium">Choose a quantity</h4>
                    <div className="flex justify-between">
                        <div className="flex items-center gap-4">
                             <div className="bg-gray-100 py-2 px-4 rounded-3xl flex items-center justify-between w-32">
                            <button className="cursor-pointer text-xl" onClick={()=> handleQuantity("d")}>-</button>
                            {quantity}
                            <button className="cursor-pointer text-xl" onClick={()=>handleQuantity("i")}>+</button>
                            </div>
                            <div className="text-xs">
                                Only <span className="text-orange-500">{product.stock} Items</span> left!
                                <br /> {"Don't"} miss it
                            </div>
                        </div>
                        <button className="w-36 text-sm rounded-3xl ring-1 ring-blue-500 text-blue-500 py-2 px-4 hover:bg-blue-500 hover:text-white"
                        onClick={handleAddToCart}>Add to Cart</button>
                    </div> 
                </div>
            </div>
        </div>
    )
}