"use client";
import { CldUploadWidget } from "next-cloudinary";
import UserRequestTable from "@/app/components/UserTable"
import { useState } from "react";
import axios from "axios";

export default function UserRequest() {
    const [userReq, setUserReq] = useState({
        wasteType:"Dry",
        location:"UnitA",
        imgUrl:"",
    })
    const handleWasteType = (e:any)=>{
        e.preventDefault()
        userReq.wasteType = e.target.value;
    }
    const handleLocation = (e:any)=>{
        e.preventDefault()
        userReq.location = e.target.value
    }
    const handleSubmit = async (e:any)=>{
        e.preventDefault()
        try {
            console.log("submit click", userReq)
            const response = await axios.post('/api/waste/request',userReq)
        } catch (error:any) {
            console.log("Not able to submit request",error);
        }
    }
  return (
    <div >
        <section className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-10">
            <form onSubmit={handleSubmit} className="bg-white w-full max-w-2xl rounded-xl shadow-lg p-6 sm:p-10">
                <h1 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-8">
                Make a Waste Collection Request
                </h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">Select Waste Type</label>
                        <select onClick={handleWasteType} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500">
                        <option value="Dry">Dry</option>
                        <option value="Wet">Wet</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">Select Location</label>
                        <select onClick={handleLocation} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500">
                        <option value="UnitA">UnitA</option>
                        <option value="UnitB">UnitB</option>
                        </select>
                    </div>
                </div>

                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-600 mb-1">Extra Notes</label>
                    <textarea
                        rows={3}
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 resize-none"
                        placeholder="Add any additional information..."
                    />
                </div>

                <div className="flex flex-col sm:flex-row gap-4 items-center justify-center mb-6">
                    <CldUploadWidget uploadPreset="wastemanagement"
                    onSuccess={(result)=>{
                        if (typeof result === "object" && "info" in result && typeof result.info === "object")
                              userReq.imgUrl = result.info.secure_url;
                    }}>
                        {({ open }) => (
                        <button
                            type="button"
                            onClick={() => open()}
                            className="w-full sm:w-1/2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 shadow-md"
                        >
                            Upload Image
                        </button>
                        )}
                    </CldUploadWidget>

                    <button
                        type="submit"
                        className="w-full sm:w-1/2 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 shadow-md"
                    >
                        Submit Request
                    </button>
                </div>
            </form>
        </section>
        <UserRequestTable />
    </div>
  );
}
