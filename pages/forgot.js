import {React,useEffect} from 'react'
import Link from 'next/link'
import { useRouter } from "next/router";
import Head from 'next/head';


const Forgot = () => {
  const router = useRouter();
  useEffect(() => {
    if(localStorage.getItem('token')){
      router.push('/')
    }
  }, [])
  return (
    <div>
      <Head>
        <title>Forgot Password - Wearhaven.com</title>
        <meta
          name="viewport"
          content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0"
        />
      </Head>
<div className="flex min-h-screen flex-col items-start justify-center px-6 lg:px-8">
  <div className="sm:mx-auto sm:w-full sm:max-w-sm">
    <img className="mx-auto h-10 w-auto" src="/logo.png" alt="Your Company"/>
    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Reset your Password</h2>
  </div>

  <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    <form className="space-y-6" action="#" method="POST">
      <div>
        <label for="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
        <div className="mt-2">
        <input id="email" name="email" type="email" autocomplete="email" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 placeholder:px-2 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6" placeholder="Enter your Email ID"/>
        </div>
      </div>
      <div>
        <button type="submit" className="flex w-full justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600">Continue</button>
      </div>
    </form>

    <p className="mt-10 text-center text-sm text-gray-500">
      Remember your Password?
      <Link href={"/login"}className="font-semibold leading-6 text-red-600 hover:text-red-500"> Log in</Link>
    </p>
  </div>
</div>

    </div>
  )
}

export default Forgot
