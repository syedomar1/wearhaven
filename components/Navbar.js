import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AiOutlineShoppingCart, AiOutlineCloseCircle } from "react-icons/ai";
import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";
import { IoBagCheckOutline } from "react-icons/io5";
import {useRef} from 'react'


const Navbar = () => {
  const toggleCart = () =>{
    if (ref.current.classList.contains('translate-x-full')){
      ref.current.classList.remove('translate-x-full');
      ref.current.classList.add('translate-x-0')
    }
    else if (!ref.current.classList.contains('translate-x-full')){
      ref.current.classList.remove('translate-x-0')
      ref.current.classList.add('translate-x-full');
    }
  }
  const ref = useRef()
  return (
    <div className='flex flex-col md:flex-row md:justify-start justify-center items-center py-2 shadow-md'>
      <div className="logo mx-5">
        <Link href={"/"}><Image src="/logo.png" alt="Logo" height={40} width={180}/></Link>
      </div>
      <div className="nav">
        <ul className='flex items-center space-x-6 font-bold md:text-md'>
            <Link href={'/tshirts'}><li>Tshirts</li></Link>
            <Link href={'/hoodies'}><li>Hoodies</li></Link>
            <Link href={'/stickers'}><li>Stickers</li></Link>
            <Link href={'/mugs'}><li>Mugs</li></Link>
        </ul>
      </div>
      <div onClick={toggleCart} className='cursor-pointer cart absolute right-0 top-4 mx-5'>
        <AiOutlineShoppingCart className='text-xl md:text-2xl'/>
      </div>

<div ref={ref} className="w-72 h-full sidecart absolute top-0 right-0 bg-red-100 px-8 py-10 transform transition-transform translate-x-full z-10">
  <h2 className='font-bold text-xl text-center'>Shopping Cart</h2>
  <span onClick={toggleCart} className="absolute top-5 right-2 cursor-pointer text-2xl"><AiOutlineCloseCircle /></span>
  <ol className='list-decimal font-semibold'>
    <li>
      <div className="item flex my-5">
      <div className='w-2/3 font-semibold'>Tshirt - Wear from Haven</div>
      <div className='flex items-center justify-center font-semibold w-1/3 text-lg'><CiCircleMinus className='cursor-pointer' /><span className='mx-2 text-sm'>1</span><CiCirclePlus className='cursor-pointer'/></div>
      </div>
    </li>
  </ol>
  <button className="flex mx-auto mt-16 text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded text-sm"><IoBagCheckOutline className='m-1' />Checkout</button>
</div>
</div>
  )
}

export default Navbar
