"use client"

import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import Image from 'next/image';
import React,{useState} from 'react';
import UserNavBar from './components/UserNavBar';
import CollectorNavBar from './components/CollectorNavBar';
import { useCartStore } from '@/helpers/zustandCartStore';
import CartModel from './components/CartModel';
import Menu from './components/SmallMenu';

export default function Header() {
    const router = useRouter();
    const [show, setShow] = useState(false);
    const [isCartopen,setIsCartOpen]= useState(false)
    const pathName = usePathname();

    const totalUniqueItems = useCartStore((state) => state.getTotalItemInCart()); 
  return (
    <header>
    <nav className="flex justify-center">
      <div className="w-full mx-2 md:px-2 lg:px-4 xl:px-8 2xl:px-10 flex items-center justify-between mt-2 mb-3">
        {/* logo */}
        <div className="flex-shrink-0">
        <Link href="/">
            <Image
              src="/homeImg/logo.png" // Make sure this file exists in your /public folder
              alt="Logo"
              width={200}
              height={60}
              className="cursor-pointer"
            />
          </Link>
        </div>

        {/* header for small screen w<768 */}
        {/* //start */}
        {pathName=== "/" &&
        <div className={`relative cursor-pointer md:hidden ${show ? "w-full mx-0" : "w-auto mx-4" }`}
        onClick={()=> {
          // console.log(show);
          setShow(!show)
          console.log(show);}}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
             <path fill-rule="evenodd" d="M3 6.75A.75.75 0 0 1 3.75 6h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 6.75ZM3 12a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 12Zm0 5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z" clip-rule="evenodd" />
          </svg>
          {show && <Menu />}
          </div>}
        {/* end */}
        
        {/* Navigation Links before login */}
        { pathName=== "/" && <ul className="hidden md:flex md:text-md md:gap-8 lg:gap-15 lg:text-lg xl:gap-20 2xl:gap-25 text-lg justify-center">
          <li>
            <Link className="hover:underline decoration-2 underline-offset-6 decoration-blue-600" href="/">Home</Link>
          </li>
          <li>
            <Link className="hover:underline decoration-2 underline-offset-6 decoration-blue-600" href="#about">About</Link>
          </li>
          <li>
            <Link className="hover:underline decoration-2 underline-offset-6 decoration-blue-600" href="#contact">Contact</Link>
          </li>
          <li>
            <Link className="hover:underline decoration-2 underline-offset-6 decoration-blue-600" href="/store">Store</Link>
          </li>
        </ul> }
  
        {/* Buttons before login */}
        { pathName=== "/" && <div className="hidden md:flex gap-4">
          <button onClick={() => router.push('/login')} 
            className="px-3 py-2 md:px-4 border border-blue-500 text-blue-500 rounded-full hover:bg-blue-100">
            Login
          </button>
          <button onClick={() => router.push('/register')} className="px-3 md:px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600">
            Signup
          </button>
        </div>}

        {/* {store cart} */}
        {(pathName === "/store" || pathName === "/store/singleProduct") && (
          // <div className='right mr-8'>
            <>
            <div className='mr-30 relative cursor-pointer' onClick={()=> setIsCartOpen(!isCartopen)}>
                <svg  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                </svg>
                {totalUniqueItems>0 && <div className='absolute top-[-12] right-[-6] w-4 h-4 bg-red-500 rounded-full text-white text-sm flex items-center justify-center'>{totalUniqueItems}</div>}

            </div>
            {isCartopen && <CartModel />}
            </>)
          // </div>
        }
        {/* Navbar for User */}
        {
           pathName.startsWith('/user') && <UserNavBar/>
        }

        {/* Navbar for collector */}
        {
          pathName.startsWith('/collector') && <CollectorNavBar />
        }
      </div>
    </nav>
  </header>
  
  )
}