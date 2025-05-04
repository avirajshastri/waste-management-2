"use client"
import Link from "next/link"
import React,{useState} from "react"
import axios from "axios"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"

export default function Login() {
  const router = useRouter()
  const [user, setUser] = useState({
    email: "",
    password:""
  })
  const [error,setError] = useState('')

  const handleSubmit= async (e:any)=>{
    e.preventDefault();
    if([user.email,user.password].some((field)=> field?.trim()===''))
    {
       setError("Field/Fields must not be empty")
       setTimeout(() => setError(''),3000)
       return ;
    }
    try {
      console.log("idhar aaaya")
      const response = await axios.post("/api/users/login",user)
      console.log("Login successfull", response.data)
      router.push("/profile")
    } catch (error:any) {
      console.log("Error in login")
      toast.error(error.message)
    }
  }
    return (
      <div className="h-screen w-full flex justify-center items-center">
        <form  onSubmit={handleSubmit} className="w-full max-w-md p-8 bg-white shadow-md rounded-lg flex flex-col justify-center items-center">
          <h1 className="text-center mb-6 text-2xl">Account Login</h1>
          <div className="w-full flex flex-col gap-4 mb-4">
            <div className="flex">
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6 mt-3 mr-2">
             <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
             </svg>
             <input type="email" id="email" value={user.email} placeholder="email" onChange={(e) => setUser({...user, email:e.target.value})}
             className="w-full h-12 px-4 border-2 border-gray-200 rounded-full text-base focus:outline-none"/>
            </div>
         
            <div className="flex">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6 mt-3 mr-2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
            </svg>
            <input type="password" id="password" value={user.password} placeholder="password" onChange={(e)=> setUser({...user,password:e.target.value})}
            className="w-full h-12 px-4 border-2 border-gray-200 rounded-full text-base focus:outline-none"/>
            </div>
            
          </div>
          {error && <p className="mb-2">{error}</p>}
          <button className="mb-4 bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600">Login</button>
          <Link href="/register" className="mb-2 hover:underline decoration-2 underline-offset-6 decoration-blue-500">Register now</Link>
          <Link href="/forgot-password" className="hover:underline decoration-2 underline-offset-6 decoration-blue-500">Forgot password?</Link>
        </form>
      </div>
    )
  }