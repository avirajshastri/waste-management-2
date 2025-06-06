"use client"
import axios from "axios"
import Link from "next/link"
import React,{useState,useEffect} from "react"

export default function VerifyEmailPage(){
        const [token, setToken] = useState("")
        const [verified,setVerified] = useState(false)
        const [error,SetError] = useState(false)

        const verifyUserEmail = async () =>{
            try {
                await axios.post('/api/users/verifyemail',{token})
                setVerified(true);
            } catch (error:any) {
                SetError(true)
                console.log(error.response.data)
            }

        }

        useEffect(()=>{
            const urlToken = window.location.search.split("=")[1]
            setToken(urlToken || '')
        },[])

        useEffect(() =>{
            if(token.length>0){
                verifyUserEmail();
            }
        },[token])

        return (
            <div className="flex flex-col justify-center items-center min-h-screen">
                <h1 className="text-2xl mb-4">Verify Email</h1>
                {verified && (
                <div>
                    <h2>Email verified</h2>
                    <Link href="/login"> Login</Link>
                </div>
                
                )}
                {error && (
                  <div>
                    <h2>Error in verifying email</h2>
                  </div>
                )}
            </div>
        )
}