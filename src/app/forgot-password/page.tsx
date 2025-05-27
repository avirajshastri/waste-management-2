"use client"
import React,{useState,useEffect} from "react"
import { Suspense } from "react";
import axios from 'axios'
import { useSearchParams } from 'next/navigation';
import { div, h1 } from "framer-motion/client";
import { useRouter } from "next/navigation";

 function ForgotPasswordContent(){
    
    const searchParams = useSearchParams()
    const token = searchParams.get('token')
    const router = useRouter()

    const [user,setUser]= useState({
        email:"",
        password:"",
        ftoken: "",
    })

    const handleForgotPassword = async () =>{ 
        try {
            const response = await axios.post("/api/users/forgot-password",user)
            console.log("Mail sent successfully",response.data)
        } catch (error:any) {
            console.log("Not able to send mail",error)
        }
    }

    const handleResetPassword= async () =>{
        try {
          const response = await axios.post("/api/users/reset-password",user)
          console.log("Password changed successfully", response.data)  
          router.push("/login")
        } catch (error:any) {
            console.log("Error in changing password",error)
        }
    }

    useEffect(()=>{
        if(token)
          setUser({...user,ftoken:token.toString()})
    },[token])
    if(token)
    {
        console.log(token)
        return (
            <div className="flex flex-col justify-center items-center">
                <h1 className="mb-4 text-2xl">Change Password</h1>
                <div className="flex mb-4 w-1/4">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6 mt-3 mr-2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                    </svg>
                    <input type="password" id="password" value={user.password} placeholder="password" onChange={(e)=> setUser({...user,password:e.target.value})}
                    className="w-full h-12 px-4 border-2 border-gray-200 rounded-full text-base focus:outline-none"/>
                </div>
                <button onClick={handleResetPassword} className="mb-4 bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600">Reset</button>
            </div>
        )
    }

    return(
        <div className="flex flex-col justify-center items-center">
            <h1 className="mb-4 text-2xl">Send the passowrd-reset request to your mail</h1>
            <div className="flex mb-4 w-1/4">
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6 mt-3 mr-2">
             <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
             </svg>
             <input type="email" id="email" value={user.email} placeholder="email" onChange={(e) => setUser({...user, email:e.target.value})}
             className="w-full h-12 px-4 border-2 border-gray-200 rounded-full text-base focus:outline-none"/>
            </div>
            
             <button onClick={handleForgotPassword} className="mb-4 bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600">Send</button>
        </div>
    )
}

export default function ForgotPasswordPage() {
  return (
    <Suspense>
      <ForgotPasswordContent />
    </Suspense>
  );
}