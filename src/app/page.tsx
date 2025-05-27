"use client"

import Router, { useRouter } from "next/navigation"
import React from "react"

export default function Home() {
  const router = useRouter()
  return (
    <>
    <section className='max-md:flex-col-reverse flex'>
      <div className="flex flex-col md:justify-center md:items-center lg:w-2/5 pt-4 pb-4 pl-12 pr-12 ">
        <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl mb-4" >Revolutionize your <span className="text-blue-600">Waste Management</span></h1>
        <p className="text-md lg:text-lg mb-4">Monitor requests, earn points, and redeem them in our eco-store. Simple, smart, and sustainable.</p>
        <button className="max-md:w-24 px-4 py-2 rounded-full text-white  bg-blue-500 hover:bg-blue-600 " onClick={()=> router.push("/register")}>Register</button>
      </div>
      <div className="lg:w-3/5 rounded-tl-full overflow-hidden bg-[#ebf2fa]">
        <img className="max-w-full h-auto opacity-80" src="/homeImg/Landpage-1.png" alt="" />
      </div>
    </section>
    <br className="bg-gray-500"/>
    {/* about */}
    <section id="about" className="max-md:flex-col flex pt-8">
      <div className="flex items-center justify-center md:w-1/2">
          <img className="md:w-3/4 h-auto" src="/homeImg/Landpage-2.png" alt="" />
      </div>
      <div className="md:w-1/2 flex flex-col justify-center items-center">
          <h1 className="text-2xl md:text-3xl mb-4">About Us</h1>
          <p className="px-8">Our waste management platform connects users and collectors for fast, efficient waste pickup. Users can submit requests with photos, track progress in real time, and earn credit points for each collection. These points can be redeemed for eco-friendly products in our store. Collectors use a smart dashboard to manage requests and view insights by location, waste type, and status. We make waste management simple, rewarding, and sustainable.</p>
      </div>
    </section>

    <br className="bg-gray-500"/>
     {/* contact us */}
     <section id="contact" className="flex justify-center mt-8">
     <div className="font-sans flex-col md:flex-row justify-center items-center min-h-screen bg-white px-4">
      <h1 className="text-center text-xl font-semibold mt-2 md:hidden">Get in Touch</h1>
  <div className="flex w-full max-w-6xl shadow-lg rounded-lg overflow-hidden bg-white">
    {/* Form Section */}
    <form className="flex-1 p-10">
      <div className="grid grid-cols-1 gap-4">
        <input
          type="text"
          name="FirstName"
          placeholder="First Name"
          className="w-full h-12 px-4 border-2 border-gray-200 rounded-full text-base focus:outline-none"
        />
        <input
          type="text"
          name="LastName"
          placeholder="Last Name"
          className="w-full h-12 px-4 border-2 border-gray-200 rounded-full text-base focus:outline-none"
        />
        <input
          type="email"
          name="Email"
          placeholder="Email"
          className="w-full h-12 px-4 border-2 border-gray-200 rounded-full text-base focus:outline-none"
        />
        <input
          type="text"
          name="PhoneNumber"
          placeholder="Phone Number"
          className="w-full h-12 px-4 border-2 border-gray-200 rounded-full text-base focus:outline-none"
        />
        <textarea
          placeholder="What's on your mind?"
          className="w-full min-h-[120px] p-4 border-2 border-gray-200 text-base rounded-lg focus:outline-none"
        ></textarea>
        {/* <div className="flex items-start gap-2">
          <input type="checkbox" id="consent" />
          <label htmlFor="consent" className="text-gray-500 text-sm">
            Turpis blandit massa interdum quam amet.
          </label>
        </div> */}
        <button
          type="submit"
          className="w-full  bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-full text-lg"
        >
          Submit
        </button>
      </div>
    </form>

    {/* Side Panel */}
    <div className="max-md:hidden w-full md:w-1/3 bg-sky-100 flex flex-col justify-center items-center p-8 text-center">
      <h2 className="text-2xl font-bold mb-4">Get in Touch</h2>
      <p className="text-gray-700 mb-6 max-w-xs">
        Contact us on our social media handles.
      </p>
      <div className="flex space-x-4">
        <a href="https://x.com/"><img src="https://workik-widget-assets.s3.amazonaws.com/Footer1-83/v1/images/Icon-twitter.png" className="w-5 h-5" alt="Twitter" /></a>
        <a href="https://www.facebook.com/"><img src="https://workik-widget-assets.s3.amazonaws.com/Footer1-83/v1/images/Icon-facebook.png" className="w-5 h-5" alt="Facebook" /></a>
        <a href="https://www.instagram.com/"><img src="https://workik-widget-assets.s3.amazonaws.com/Footer1-83/v1/images/Icon-instagram.png" className="w-5 h-5" alt="Instagram" /></a>
      </div>
    </div>
  </div>
</div>


     </section>
    </>
  )
}