import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
// import mongoose from 'mongoose'
// import Order from '@/models/Order'

const Orders = () => {
  const router = useRouter()
  const [orders, setOrders] = useState([])
    useEffect(()=>{
      const fetchOrders = async()=>{
        let a = await fetch(`/api/myorders`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({token: localStorage.getItem('token')}),
        })
        let res = await a.json()
        setOrders(res.orders)
        console.log(res)
      }
      if(!localStorage.getItem('token')){
        router.push('/login')
      }
      else{
        fetchOrders()
    }
    },[])
  return (
    <div className='min-h-screen'>
      <h1 className='font-semibold text-2xl text-center p-8'>My Orders</h1>
      <div className="container mx-auto">
      <div className="flex flex-col">
  <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
    <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
      <div className="overflow-hidden">
        <table
          className="min-w-full text-left text-sm font-light text-surface text-black">
          <thead
            className="border-b border-neutral-200 font-medium border-black/10">
            <tr>
              <th scope="col" className="px-6 py-4">#Order Id</th>
              <th scope="col" className="px-6 py-4">Email</th>
              <th scope="col" className="px-6 py-4">Amount</th>
              <th scope="col" className="px-6 py-4">Details</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((item)=>{

            
            return <tr key={item._id}
              className="border-b border-neutral-200 transition duration-300 ease-in-out border-black/10 hover:bg-red-300">
              <td className="whitespace-nowrap px-6 py-4 font-medium">{item.orderId}</td>
              <td className="whitespace-nowrap px-6 py-4 text-gray-900 font-light">{item.email}</td>
              <td className="whitespace-nowrap px-6 py-4 text-gray-900 font-light">{item.amount}</td>
              <td className="whitespace-nowrap px-6 py-4 text-gray-900 font-light">
                <Link href={'/order?id='+ item._id}>Details</Link>
              </td>
            </tr>
            })}
          
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>
      </div>
    </div>
  )
}

// export async function getServerSideProps(context) {
//   if (!mongoose.connections[0].readyState) {
//     await mongoose.connect(process.env.MONGO_URI);
//   }
  
//   return {
//     props: {orders: orders},
//   };
// }

export default Orders
