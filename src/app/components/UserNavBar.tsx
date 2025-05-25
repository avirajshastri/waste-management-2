"use client"
import Link from "next/link"
import { useRouter } from "next/navigation"
import axios from "axios"
import {useState} from "react"

export default function UserNavBar(){
    const [show, setShow] = useState(false)
    const router = useRouter()

    const HandleLogout = async ()=>{
        try {
            const response = await axios.get('/api/users/logout');
            console.log("Logout successfully",response)
            router.push('/')
        } catch (error:any) {
            console.log("Error in logging out", error);
        }
    }
    return(
        <>
         <div className={`relative cursor-pointer md:hidden ${show ? "w-full mx-0" : "w-auto mx-4" }`}
                onClick={()=> {
                  // console.log(show);
                  setShow(!show)
                  console.log(show);}}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                     <path fill-rule="evenodd" d="M3 6.75A.75.75 0 0 1 3.75 6h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 6.75ZM3 12a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 12Zm0 5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z" clip-rule="evenodd" />
                  </svg>
                  {show && (
                     <div className="p-4 absolute bg-[#ebf2fa] text-black left-0 w-full flex flex-col justify-center items-center gap-8 z-10">
                    <Link href="/user/request" >Request</Link>
                    <Link href="/store" >Store</Link>
                    <Link href="/user/dashboard" >Dashboard</Link>
                    <button className="cursor-pointer" onClick={HandleLogout}>Logout</button>
                    </div>
                  )}
          </div>
        <ul className="hidden md:flex gap-20 text-lg justify-center flex-1">
          <li>
            <Link className="hover:underline decoration-2 underline-offset-6 decoration-blue-600" href="/user/request">Request</Link>
          </li>
          <li>
            <Link className="hover:underline decoration-2 underline-offset-6 decoration-blue-600" href="/store">Store</Link>
          </li>
          <li>
            <Link className="hover:underline decoration-2 underline-offset-6 decoration-blue-600" href="/user/dashboard">Dashboard</Link>
          </li>
        </ul>
        {/* <div className="flex gap-4">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 12a2.25 2.25 0 0 0-2.25-2.25H15a3 3 0 1 1-6 0H5.25A2.25 2.25 0 0 0 3 12m18 0v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 9m18 0V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v3" />
          </svg>
          <span></span>
        </div> */}
        <div className="hidden md:flex gap-4">
          <button onClick={HandleLogout} 
            className="px-4 py-2 bg-blue-500 text-white hover:bg-blue-600 rounded-full">
            Logout
          </button>
        </div>
        </> 
    )
}