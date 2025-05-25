"use client"
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import useSWR from "swr";
import AllUserRequests from "@/app/components/CollectorRequestTable";

const fetcher = (url:string) => axios.get(url).then(res=> res.data)

export default function CollectorRequest(){
    const router = useRouter();
    return(
        <div>
            <h1 className="text-2xl text-center mb-8">Manage All Request</h1>
            <AllUserRequests />
        </div>
    )
}