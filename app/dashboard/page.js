'use client'
import React, { useEffect, useState } from 'react'
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from 'next/navigation'
import { fetchuser, updateProfile } from '@/actions/useractions'
import { toast } from 'react-toastify'

const Dashboard = () => {
  const { data: session, status, update} = useSession()
  const router = useRouter()
  const [form, setform] = useState({})

  const getData = async () => {
    if (session) {
      let u = await fetchuser(session?.user?.name)
      setform(u || {})
    }

  }

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async(e)=> {
    update()
    let a = await updateProfile(e, session?.user?.name)
    toast("Profile updated !!")
  }

  useEffect(() => {
    document.title = "Dashboard - Get me a Chai"
    getData()
    if (status === 'unauthenticated') {
      router.replace('/login')
    }
  }, [status, router, update])

  if(status === "loading") {
    return <div className='p-10'>Loading...</div>
  }


  return (
    <>
      <div className='flex flex-col items-center gap-3'>
        <h2 className='text-2xl font-bold mt-2'>Welcome to your Dashboard</h2>

        <form className='flex flex-col gap-3 items-center' action={handleSubmit}>
          <div className='flex flex-col w-[70vw] md:w-[35vw]'>
            <label htmlFor="name">Name</label>
            <input value={form.name ? form.name : ""} onChange={handleChange} className=' bg-slate-800 rounded-md p-1' type="text" name='name' id='name' />
          </div>

          <div className='flex flex-col w-[70vw] md:w-[35vw]'>
            <label htmlFor="email">Email</label>
            <input value={form.email ? form.email : ""} onChange={handleChange} className=' bg-slate-800 rounded-md p-1' type="text" name='email' id='email' />
          </div>

          <div className='flex flex-col w-[70vw] md:w-[35vw]'>
            <label htmlFor="username">Username</label>
            <input value={form.username ? form.username : ""} onChange={handleChange} className=' bg-slate-800 rounded-md p-1' type="text" name='username' id='username' />
          </div>

          <div className='flex flex-col w-[70vw] md:w-[35vw]'>
            <label htmlFor="profilepic">Profile Picture</label>
            <input value={form.profilepic ? form.profilepic : ""} onChange={handleChange} className=' bg-slate-800 rounded-md p-1' type="text" name='profilepic' id='profilepic' />
          </div>

          <div className='flex flex-col w-[70vw] md:w-[35vw]'>
            <label htmlFor="coverpic">Cover Picture</label>
            <input value={form.coverpic ? form.coverpic : ""} onChange={handleChange} className=' bg-slate-800 rounded-md p-1' type="text" name='coverpic' id='coverpic' />
          </div>

          <div className='flex flex-col w-[70vw] md:w-[35vw]'>
            <label htmlFor="razorpayid">Razorpay Credentials</label>
            <input value={form.razorpayid ? form.razorpayid : ""} onChange={handleChange} className=' bg-slate-800 rounded-md p-1' type="text" name='razorpayid' id='razorpayid' />
          </div>

          <div className='flex flex-col w-[70vw] md:w-[35vw]'>
            <label htmlFor="razorpaysecret">Razorpay Secret</label>
            <input value={form.razorpaysecret ? form.razorpaysecret : ""} onChange={handleChange} className=' bg-slate-800 rounded-md p-1' type="password" name='razorpaysecret' id='razorpaysecret' />
          </div>


          <button className='rounded-lg w-[70vw] md:w-[35vw] m-2 bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-base text-sm px-4 py-2.5 text-center leading-5'>Save</button>
        </form>
      </div>
    </>
  )
}

export default Dashboard
