"use client"
import axios from "axios"
import { useEffect, useState } from "react"
import { CldUploadWidget } from "next-cloudinary"


export default function StoreAdmin(){
    const [product,setProduct] = useState({
        name: "",
        description: "",
        imgUrl: "",
        price: 0,
        stock: 0,
    })

    // const [imgUrl,setImgUrl] = useState("")

    const handleSubmit = async (e:any)=>{
        e.preventDefault();
        console.log("aaya",product)
        try {
            // console.log("img url:",imgUrl)
            // setProduct({...product,imgUrl: imgUrl})
            const response = await axios.post("/api/product/storeAdmin",product)
            console.log("Product added successfully",response)
            setProduct({
                name:"",
                description:"",
                imgUrl:"",
                price: 0,
                stock: 0,
            })
        } catch (error:any) {
            console.log("Not able to add product",error);
        }
    }
    return(
        <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
            <form className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-xl space-y-6"
                onSubmit={handleSubmit}>
                <h2 className="text-2xl font-bold text-center text-gray-800">Add New Product</h2>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <input
                        id="name"
                        value={product.name}
                        type="text"
                        onChange={(e)=> setProduct({...product, name:e.target.value})}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Product Name"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                        id="description"
                        value={product.description}
                        onChange={(e)=>{ setProduct({...product,description:e.target.value})}}
                        rows={3}
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 resize-none"
                        placeholder="Add product information..."
                    />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹)</label>
                        <input
                            id="price"
                            value={product.price}
                            onChange={(e)=>{ setProduct({...product, price:parseInt(e.target.value)})}}
                            type="number"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Price"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Stock</label>
                        <input
                            id="stock"
                            value={product.stock}
                            onChange={(e)=>{ setProduct({...product,stock: parseInt(e.target.value)})}}
                            type="number"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Stock Quantity"
                        />
                    </div>
                </div>

                <div>
                    <CldUploadWidget uploadPreset="wastemanagement"
                        onSuccess={(result)=>{
                            const secure_url= typeof result === "object" && result?.info && typeof result.info === "object" && typeof result.info.secure_url === "string"
                            ? result.info.secure_url: null;
                            if (secure_url)
                                setProduct(prev => ({ ...prev, imgUrl: secure_url }));
                            }}>
                            {({ open }) => (
                            <button
                                type="button"
                                onClick={() => open()}
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 shadow-md"
                            >
                                Upload Image
                            </button>
                            )}
                    </CldUploadWidget>
                </div>

                <button
                    type="submit"
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 shadow-md"
                >
                    Add Product
                </button>
            </form>
        </div>

    )
}