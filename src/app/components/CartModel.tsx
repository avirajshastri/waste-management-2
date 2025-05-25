"use client"

import { useCartStore } from "@/helpers/zustandCartStore"
import { img } from "framer-motion/client"


export default function CartModel(){

    const {cart, removeFromCart} = useCartStore()
    const totalPrice =cart.reduce((sum, item) => sum + item.price, 0);
    return(
        <div className="w-max absolute p-4 rounded-md shadow-[0_3px_10px_rgb(0,0,0,0.2) bg-white top-12 right-0 flex flex-col gap-6 z-20">
            { !cart.length ? (<div className="">Cart is Empty</div>) :
            (
                <>
                 <h2 className="text-xl">Shopping Cart</h2>
                 {/* LIST */}

                 <div className="flex flex-col gap-8">
                    {/* Item */}
                    {cart.map((item)=>(
                        <div className="flex gap-4" key={item._id}>
                            {item.imgUrl && (
                                <img src={item.imgUrl} className="w-[72px] h-[96px] object-cover rounded-md" alt="" />
                            )}
                            <div className="flex flex-col justify-between w-full">
                                {/* top */}
                                <div>
                                    {/* title */}
                                    <div className="flex items-center justify-between gap-8">
                                        <h3 className="font-semibold">{item.name}</h3>
                                        <div className="p-1 bg-gray-50 rounded-sm flex items-center gap-2">
                                            {item.quantity && item.quantity>1 && (
                                                <div className="text-xs text-green-500">{item.quantity} x{""}</div>
                                            )}
                                            Rs{item.price}
                                        </div>
                                    </div>
                                    {/* {desc} */}
                                    <div className="text-sm text-gray-500">{item.stock}</div>
                                </div>
                                {/* bottom */}
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500">Qty. {item.quantity}</span>
                                    <span className="text-blue-500 cursor-pointer" onClick={()=> removeFromCart(item._id)}>Remove
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                 </div>
                 {/* checkout */}
                 <div>
                    <div className="flex items-center justify-between font-semibold">
                        <span>SubTotal</span>
                        <span>Rs{totalPrice}</span>
                    </div>
                    <p className="text-gray-500 text-sm mt-2 mb-4">
                        Shipping and taxes calculated at checkout
                    </p>
                    <div className="flex justify-between text-sm">
                        <button className="rounded-md py-3 px-4 ring-1 ring-gray-300">View Cart</button>
                        <button className="rounded-md py-3 px-4 bg-black text-white disabled:cursor-not-allowed disabled:opacity-75">Checkout</button>
                    </div>
                 </div>
                </>
            )}
        </div>
    )
}