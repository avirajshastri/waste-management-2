"use client"
import useSWR from "swr"
import axios from "axios"
import { useState } from "react";

const fetcher = (url:string) => axios.get(url).then(res => res.data)

export default function AllUserRequests(){
    const {data, error,isLoading} = useSWR('/api/waste/request/getAllReqs',fetcher,{
        refreshInterval:5000,
    });
    const [status,setStatus] = useState("");

    const handleUpdateStatus =async (userId:string ,id:string, newStatus:string)=>{
        try {
            const response = await axios.put('/api/waste/request/updateStatus',{
                userId,
                id,
                status: newStatus
            })
            console.log("status updated", response);
        } catch (error:any) {
            console.log("Not able to update status",error)

        }
    }

    if(isLoading) return <p className="text-center">Loading Requests...</p>
    if(error) return <p className="text-center text-red-500">Error loading requests</p>
    return(
        <div className="overflow-x-auto mt-6">
            <table className="min-w-full bg-white border rounded-xl shadow">
                <thead>
                    <tr className="bg-gray-200 text-gray-600 text-left text-sm uppercase">
                        <th className="py-3 px-4 border-b">User Email</th>
                        <th className="py-3 px-4 border-b">Waste Type</th>
                        <th className="py-3 px-4 border-b">Location</th>
                        <th className="py-3 px-4 border-b">Requested At</th>
                        <th className="py-3 px-4 border-b">Collected At</th>
                        <th className="py-3 px-4 border-b">Status</th>
                        <th className="py-3 px-4 border-b">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.map((req: any) => (
                        <tr key={req._id} className="hover:bg-gray-50 transition">
                            <td className="py-3 px-4 border-b">{req.userId?.email || 'N/A'}</td>
                            <td className="py-3 px-4 border-b">{req.wasteType}</td>
                            <td className="py-3 px-4 border-b">{req.location}</td>
                            <td className="py-3 px-4 border-b">
                                {new Date(req.requestedAt).toLocaleDateString()}
                            </td>
                             <td className="py-3 px-4 border-b">
                                {req.collectedAt ? new Date(req.collectedAt).toLocaleDateString(): '-'}
                            </td>
                            <td className="py-3 px-4 border-b">
                                <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                                req.status === 'PENDING' ? 'bg-yellow-400' :
                                req.status === 'ACCEPTED' ? 'bg-blue-500 text-white' :
                                req.status === 'COMPLETED' ? 'bg-green-500 text-white' :
                                'bg-red-500 text-white'
                                }`}>
                                {req.status}
                                </span>
                            </td>
                            <td className="py-3 px-4 border-b">
                                {req.status === 'PENDING' && (
                                <div className="flex gap-2">
                                    <button
                                    onClick={() => handleUpdateStatus(req.userId,req._id, 'ACCEPTED')}
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-full"
                                    >
                                    Accept
                                    </button>
                                    <button
                                    onClick={() => handleUpdateStatus(req.userId,req._id, 'CANCELLED')}
                                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-full"
                                    >
                                    Cancel
                                    </button>
                                </div>
                               
                                )}
                                {req.status ==='ACCEPTED' && (
                                    <button
                                    onClick={() => handleUpdateStatus(req.userId,req._id, 'COMPLETED')}
                                    className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-full">
                                     Collect
                                    </button>                                       
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}