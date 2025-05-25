"use client"

import Link from "next/link"
import React,{useState} from "react"
import Router, { useRouter } from "next/navigation"
import axios from "axios"
import toast from "react-hot-toast"


export default function RegisterPage() {
    const router = useRouter()
    const [role, setRole] = useState("User")
    const [user,setUser] = useState({
      fullName: "",
      email: "",
      password: "",
      phoneNumber: "",
      confirmPassword: "",
      role: "user",
    })
    const [error,setError] = useState("")

    const handleRoleChange = (e:any)=>{
      e.preventDefault()
      // console.log(e.target.value)
      setRole(e.target.value);
      user.role = e.target.value
      console.log(user.role);
    }

    const handleSubmit = async (e:any) =>{
      e.preventDefault()
      // console.log(user.phoneNumber === '', user.phoneNumber);
      // console.log(user);
      if([user.fullName,user.email,user.password,user.phoneNumber].some((field) => field?.trim()===''))
      {
         setError("Field/Fields must not be empty")
         setTimeout(() =>{setError("")},3000)
         return 
      }
        if(user.password!== user.confirmPassword){
          // console.log("aaa")
           setError("Passwords are not matching")

           setTimeout(() => {setError("")},3000);
           return
        }
        if(user.password.length<8)
        {
           setError("Password must be greater than 8 letters")
           setTimeout(() => {setError("")},3000)
           return
        }
        try {
          // console.log('isme aaya')
          const response = await axios.post("/api/users/register",user);
          console.log("Registeration successfull", response.data);
          router.push("/login")
        } catch (error:any) {
           console.log("Registration failed",error.message)
           toast.error(error.message)
        }
    }
    
    return (
      <div className="flex items-center justify-center mt-2">
        <form onSubmit={handleSubmit} className="w-full max-w-md mt-2 pt-4 pb-4 pl-8 pr-8 shadow-md rounded-lg">
          <h1 className="text-2xl font-semibold text-center mb-6 text-gray-800">Registeration Form</h1>

          {/* Role */}
          <div className="mb-4">
            <label>Select Role</label>
            <hr  className="border-0"/>
            <select className="border-1 rounded-sm p-1"
            onChange={handleRoleChange}>
              <option value="user">User</option>
              <option value="collector">Collector</option>
            </select>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <input
              type="text"
              id="fullName"
              placeholder="Name"
              value={user.fullName}
              onChange={(e)=> setUser({...user,fullName:e.target.value})}
              className="w-full h-12 px-4 border-2 border-gray-200 rounded-full text-base focus:outline-none"
            />
            <input
              type="email"
              id="email"
              placeholder="Email"
              value={user.email}
              onChange={(e) => setUser({...user,email:e.target.value})}
              className="w-full h-12 px-4 border-2 border-gray-200 rounded-full text-base focus:outline-none"
            />
            <input
              type="text"
              id="phoneNumber"
              placeholder="Phone Number"
              value={user.phoneNumber}
              onChange={(e) => setUser({...user, phoneNumber:e.target.value})}
              className="w-full h-12 px-4 border-2 border-gray-200 rounded-full text-base focus:outline-none"
            />
            <input
              type="password"
              id="password"
              placeholder="Password"
              value={user.password}
              onChange={(e) => setUser({...user, password:e.target.value})}
              className="w-full h-12 px-4 border-2 border-gray-200 rounded-full text-base focus:outline-none"
            />
            <input
              type="password"
              id="confirmPassword"
              placeholder="Confirm Password"
              value={user.confirmPassword}
              onChange={(e)=>{ setUser({...user,confirmPassword:e.target.value})}}
              className="w-full h-12 px-4 border-2 border-gray-200 rounded-full text-base focus:outline-none"
            />
            
            {error && <p>{error}</p>}

            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-full text-lg mb-2"
            >
              Create Account
            </button>
            
            <Link className="m-auto hover:underline decoration-2 underline-offset-6 decoration-blue-600" href="/login">Go to sign up page</Link>
          </div>
        </form>

      </div>
    )
  }