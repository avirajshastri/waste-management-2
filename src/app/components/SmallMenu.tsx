"use client"
import Link from "next/link"
import Router,{useRouter} from "next/navigation"
export default function Menu(){

    const router = useRouter()
    return (
        <div className="absolute opacity-80 bg-[#ebf2fa] text-black left-0 w-full flex flex-col justify-center items-center gap-8 z-10">
            <Link href="/" >Home</Link>
            <Link href="#about" >About</Link>
            <Link href="#contact" >Contact</Link>
            <Link href="/store" >Store</Link>
            <button className="cursor-pointer" onClick={()=> router.push("/login")}>Login</button>
            <button className="cursor-pointer" onClick={()=> router.push("/register")}>Register</button>
        </div>
    )
}