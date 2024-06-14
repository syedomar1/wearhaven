import React, { useEffect, useState} from 'react'
import { useRouter } from 'next/router'
import mongoose from "mongoose";
import Order from '@/models/Order'

const MyOrder = ({order, clearCart}) => {
  // const {id} = router.query
  // console.log(id)
  const products = order.products;
  // console.log(order.products)
  const router = useRouter()
  const [date, setDate] = useState()
  useEffect(() =>{
    const d = new Date(order.createdAt)
    setDate(d)
    if(router.query.clearCart == 1){
      clearCart()
    }
  },[])
  // console.log(order.products)
  if (!order) {
    return (
      <div className="container mx-auto text-center py-24">
        <h1 className="text-3xl">Order not found</h1>
        <p>Please check the order ID and try again.</p>
      </div>
    );
  }
  return (
    <section className="text-gray-600 body-font overflow-hidden">
  <div className="container px-5 py-24 mx-auto">
    <div className="lg:w-4/5 mx-auto flex flex-wrap">
      <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
        <h2 className="text-sm title-font text-gray-500 tracking-widest">WEARHAVEN.COM</h2>
        <h1 className="text-gray-900 text-xl md:text-3xl title-font font-medium mb-4">Order ID: #{order.orderId}</h1>
        <p className="leading-relaxed mb-4">Yayy! Your order has been succesfully placed!</p>
        <p className="leading-relaxed mb-4">Order placed on: {date && date.toLocaleDateString("en-UK", {weekday:'long', year:'numeric', month:'long',day:'numeric'})}</p>
        <p>Your Payment Status is: <span className='font-semibold text-slate-700'>{order.status}</span></p>
        <div className="flex mb-4">
          <a className="flex-grow text-center py-2 text-lg px-1">Item Description</a>
          <a className="flex-grow text-center border-gray-300 py-2 text-lg px-1">Quantity</a>
          <a className="flex-grow text-center border-gray-300 py-2 text-lg px-1">Item Total</a>
        </div>



        {Object.keys(products).map((key)=>{
          
          return <div key={key} className="flex border-t border-gray-200 py-2">
          <span className="text-gray-500">{products[key].name}({products[key].size}/{products[key].variant})</span>
          <span className="m-auto text-gray-900">{products[key].qty}</span>
          <span className="m-auto text-gray-900">₹{products[key].price} X {products[key].qty} = ₹{products[key].price * products[key].qty}</span>
        </div>
        })}

        <div className="flex flex-col my-8">
          <span className="title-font font-medium text-2xl text-gray-900">SubTotal: ₹{order.amount}</span>
          <div className='my-6'>
          <button className="flex ml-0 text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded">Track Order</button>

          </div>
        </div>
      </div>
      <img alt="ecommerce" className="h-96 w-96 m-auto object-cover object-center rounded" src="/order.jpeg"/>
    </div>
  </div>
</section>
  )
}
export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }
  // const { id } = context.query;
  // let order = await Order.findById(id).lean();

  
  let order = await Order.findById(context.query.id);
  if (!order) {
      return {
        props: {
          order: null,
          amount: 0,
        },
      };
    }

  return {
    props: {order: JSON.parse(JSON.stringify(order))},
  };
}

export default MyOrder
