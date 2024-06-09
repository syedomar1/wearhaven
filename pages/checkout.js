import React from 'react'
import Image from "next/image";
import Link from "next/link";
import { AiOutlineShoppingCart, AiOutlineCloseCircle } from "react-icons/ai";
import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";
import { IoBagCheckOutline } from "react-icons/io5";
import { MdOutlineRemoveShoppingCart } from "react-icons/md";

const Checkout = ({cart, subTotal, addToCart, removeFromCart}) => {
  return (
    <div className='container px-2 m-auto'>
      <h1 className='font-bold text-3xl my-8 text-center'>Checkout</h1>
      <h2 className='font-semibold text-xl'>1. Delivery Details</h2>
      <div className="mx-auto flex my-2">
        <div className="px-2 w-1/2">
        <div className="mb-4">
        <label htmlFor="name" className="leading-7 text-sm text-gray-600">Name</label>
        <input type="name" id="name" name="name" className="w-full bg-white rounded border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
      </div>
        </div>
        <div className="px-2 w-1/2">
        <div className="mb-4">
        <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>
        <input type="email" id="email" name="email" className="w-full bg-white rounded border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
      </div>
        </div>
        </div>
        <div className="px-2 w-full">
        <div className="mb-4">
        <label htmlFor="address" className="leading-7 text-sm text-gray-600">Address</label>
        <textarea name="address" id="address" className="w-full bg-white rounded border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"></textarea>
      </div>
        </div>
        <div className="mx-auto flex my-2">
        <div className="px-2 w-1/2">
        <div className="mb-4">
        <label htmlFor="phone" className="leading-7 text-sm text-gray-600">Phone</label>
        <input type="phone" id="phone" name="phone" className="w-full bg-white rounded border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
      </div>
        </div>
        <div className="px-2 w-1/2">
        <div className="mb-4">
        <label htmlFor="city" className="leading-7 text-sm text-gray-600">City</label>
        <input type="city" id="city" name="city" className="w-full bg-white rounded border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
      </div>
        </div>
        </div>
        <div className="mx-auto flex my-2">
        <div className="px-2 w-1/2">
        <div className="mb-4">
        <label htmlFor="state" className="leading-7 text-sm text-gray-600">State</label>
        <input type="state" id="state" name="state" className="w-full bg-white rounded border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
      </div>
        </div>
        <div className="px-2 w-1/2">
        <div className="mb-4">
        <label htmlFor="pincode" className="leading-7 text-sm text-gray-600">PinCode</label>
        <input type="pincode" id="pincode" name="pincode" className="w-full bg-white rounded border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
      </div>
        </div>
        </div>
        <h2 className='font-semibold text-xl'>2. Review Cart Items & Pay</h2>
        <div className="p-6 m-2">
        <ol className="list-decimal font-semibold">
          {Object.keys(cart).length == 0 && (
            <div className="my-4 font-semibold">Your cart is empty!</div>
          )}
          {Object.keys(cart).map((k) => {
            return (
              <li key={k}>
                <div className="item flex my-5">
                  <div className="font-semibold">{cart[k].name}({cart[k].size}/{cart[k].variant})</div>
                  <div className="flex items-center justify-center font-semibold w-1/3 text-lg">
                    <CiCircleMinus
                      className="cursor-pointer"
                      onClick={() => removeFromCart(k, 1)}
                    />
                    <span className="mx-2 text-sm">{cart[k].qty}</span>
                    <CiCirclePlus
                      className="cursor-pointer"
                      onClick={() =>
                        addToCart(
                          k,
                          1,
                          cart[k].price,
                          cart[k].name,
                          cart[k].size,
                          cart[k].variant
                        )
                      }
                    />
                  </div>
                </div>
              </li>
            );
            })}
        </ol>
          <span className='font-bold'>Subtotal: ₹{subTotal}</span>
      </div>
      <div className="mx-4">
      <Link href={'/checkout'}> <button className="flex mr-2 text-white bg-red-500 border-0 py-2 px-2 focus:outline-none hover:bg-red-600 rounded text-sm">
            <IoBagCheckOutline className='m-1' />Pay ₹{subTotal}</button>
          </Link>
      </div>
    </div>
  )
}

export default Checkout
