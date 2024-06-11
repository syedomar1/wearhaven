import React, { useEffect } from 'react'
import { useRouter } from 'next/router'

const Myaccount = () => {
    const router = useRouter()
    useEffect(()=>{
        if(!localStorage.getItem('token')){
            router.push('/login')
        }
    },[])
  return (
    <div>
      My Account
    </div>
  )
}

export default Myaccount
