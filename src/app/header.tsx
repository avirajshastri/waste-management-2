"use client"

import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import Image from 'next/image';
import React,{useState} from 'react';


export default function Header() {
    const router = useRouter();
    const [show, setShow] = useState(true);
    const pathName = usePathname();
  return (
    <header>
    <nav className="py-4 px-4">
      <div className="container mx-auto flex items-center justify-between">
        {/* logo */}
        <div className="flex-shrink-0">
        <Link href="/" onClick={() => setShow(true)}>
            <Image
              src="/homeImg/logo.png" // Make sure this file exists in your /public folder
              alt="Logo"
              width={200}
              height={60}
              className="cursor-pointer"
            />
          </Link>
        </div>
        
        {/* Navigation Links */}
        { pathName=== "/" && <ul className="flex gap-20 text-lg justify-center flex-1">
          <li>
            <Link className="hover:underline decoration-2 underline-offset-6 decoration-blue-600" href="/">Home</Link>
          </li>
          <li>
            <Link className="hover:underline decoration-2 underline-offset-6 decoration-blue-600" href="#about">About</Link>
          </li>
          <li>
            <Link className="hover:underline decoration-2 underline-offset-6 decoration-blue-600" href="#contact">Contact</Link>
          </li>
        </ul> }
  
        {/* Buttons */}
        { pathName=== "/" && <div className="flex gap-4">
          <button onClick={() => router.push('/login')} 
            className="px-4 py-2 border border-blue-500 text-blue-500 rounded-full hover:bg-blue-100">
            Login
          </button>
          <button onClick={() => router.push('/register')} className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600">
            Signup
          </button>
        </div>}
      </div>
    </nav>
  </header>
  
  )
}