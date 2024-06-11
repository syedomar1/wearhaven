import React from "react";
import Image from "next/image";
import Link from "next/link";
import { AiOutlineShoppingCart, AiOutlineCloseCircle } from "react-icons/ai";
import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";
import { IoBagCheckOutline } from "react-icons/io5";
import { MdOutlineRemoveShoppingCart, MdAccountCircle } from "react-icons/md";
import { useRef, useState } from "react";

const Navbar = ({logout, user, cart, addToCart, removeFromCart, clearCart, subTotal }) => {
  // console.log(cart, addToCart, removeFromCart, clearCart, subTotal)
  const [dropdown, setDropdown] = useState(false)

  const ref = useRef();
  
  const toggleCart = () => {
    if (ref.current.classList.contains("translate-x-full")) {
      ref.current.classList.remove("translate-x-full");
      ref.current.classList.add("translate-x-0");
    } else {
      ref.current.classList.remove("translate-x-0");
      ref.current.classList.add("translate-x-full");
    }
  };

  return (
    <div className="flex flex-col md:flex-row md:justify-start justify-center items-center py-2 shadow-md sticky top-0 bg-white z-10">
      <div className="logo mr-auto md:mx-5">
        <Link href={"/"}>
          <Image src="/logo.png" alt="Logo" height={40} width={180} />
        </Link>
      </div>
      <div className="nav">
        <ul className="flex items-center space-x-6 font-bold md:text-md">
          <Link href={"/tshirts"}>
            <li className="hover:text-red-700">Tshirts</li>
          </Link>
          <Link href={"/hoodies"}>
            <li className="hover:text-red-700">Hoodies</li>
          </Link>
          <Link href={"/stickers"}>
            <li className="hover:text-red-700">Stickers</li>
          </Link>
          <Link href={"/mugs"}>
            <li className="hover:text-red-700">Mugs</li>
          </Link>
        </ul>
      </div>
      <div className="cursor-pointer cart items-center absolute right-0 top-4 mx-5 flex">
        <a onMouseOver={()=>{setDropdown(true)}} onMouseLeave={()=>{setDropdown(false)}}>
      {dropdown && <div onMouseOver={()=>{setDropdown(true)}} onMouseLeave={()=>{setDropdown(false)}} className="absolute right-8 bg-white shadow-xl border top-6 py-4 rounded-md px-5 w-32">
        <ul>
          <Link href={'/myaccount'}><li className="py-1 hover:text-red-700 text-sm font-bold">My Account</li></Link>
          <Link href={'/orders'}><li className="py-1 hover:text-red-700 text-sm font-bold">Orders</li></Link>
          <li onClick={logout} className="py-1 hover:text-red-700 text-sm font-bold">Logout</li>
        </ul>
      </div>}
        {user.value && <MdAccountCircle className="text-xl md:text-2xl mx-2" />}
        </a>
        {!user.value && <Link href={'/login'}>
        <button className="bg-red-500 px-2 py-1 rounded text-sm text-white mx-2">Login</button>
        </Link>}
        <AiOutlineShoppingCart
          onClick={toggleCart}
          className="text-xl md:text-2xl"
        />
      </div>
  
      <div
        ref={ref}
        className={`w-72 h-[100vh] sidecart overflow-y-scroll absolute top-0 right-0 bg-red-100 px-8 py-10 transform transition-transform ${
          Object.keys(cart).length !== 0 ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <h2 className="font-bold text-xl text-center">Shopping Cart</h2>
        <span
          onClick={toggleCart}
          className="absolute top-5 right-2 cursor-pointer text-2xl"
        >
          <AiOutlineCloseCircle />
        </span>
        <ol className="list-decimal font-semibold">
          {Object.keys(cart).length == 0 && (
            <div className="my-4 font-semibold">Your cart is empty!</div>
          )}
          {Object.keys(cart).map((k) => {
            return (
              <li key={k}>
                <div className="item flex my-5">
                  <div className="w-2/3 font-semibold">{cart[k].name}({cart[k].size}/{cart[k].variant})</div>
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
        <div className="font-bold my-2">Subtotal: ₹{subTotal}</div>

        <div className="flex">
          <Link href={"/checkout"}>
            {" "}
            <button className="flex mr-2 text-white bg-red-500 border-0 py-2 px-2 focus:outline-none hover:bg-red-600 rounded text-sm">
              <IoBagCheckOutline className="m-1" />
              Checkout
            </button>
          </Link>
          <button
            onClick={clearCart}
            className="flex mr-2 text-white bg-red-500 border-0 py-2 px-2 focus:outline-none hover:bg-red-600 rounded text-sm"
          >
            <MdOutlineRemoveShoppingCart className="m-1" />
            Clear Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
